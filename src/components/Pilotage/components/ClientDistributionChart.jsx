import React from 'react';
import {
  Box,
  Text,
  Flex,
  useColorModeValue,
  useTheme,
  Skeleton
} from '@chakra-ui/react';
import {
  Treemap,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useDashboardData } from '../hooks/useDashboardData';

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2', '#D7BDE2'];

function ClientDistributionChart() {
  const { data, loading } = useDashboardData();
  const bgColor = useColorModeValue('red.50', 'gray.800');

  // Transformer les données pour le Treemap
  const treemapData = React.useMemo(() => {
    if (!data?.clientsAnalysis || data.clientsAnalysis.length === 0) return [];

    const topClients = data.clientsAnalysis.slice(0, 8);
    const autres = data.clientsAnalysis.slice(8);

    const autresSize = autres.reduce((sum, client) => sum + client.chiffre_affaires, 0);
    const autresTransactions = autres.reduce((sum, client) => sum + client.nombre_transactions, 0);

    const children = topClients.map(client => ({
      name: client.nom_client,
      size: client.chiffre_affaires,
      transactions: client.nombre_transactions,
      panier_moyen: client.panier_moyen
    }));

    if (autresSize > 0) {
      children.push({
        name: 'Autres clients',
        size: autresSize,
        transactions: autresTransactions,
        panier_moyen: autresSize / autresTransactions
      });
    }

    return [{
      name: 'Clients',
      children: children
    }];
  }, [data?.clientsAnalysis]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Box bg="red.50" p="3" boxShadow="md" borderRadius="lg" border="1px" borderColor="red.100">
          <Text fontWeight="bold" mb={1}>{data.name}</Text>
          <Text fontSize="sm">CA: {data.size?.toLocaleString('fr-FR')} €</Text>
          <Text fontSize="sm">Transactions: {data.transactions}</Text>
          {data.panier_moyen && data.transactions > 0 && (
            <Text fontSize="sm" color="gray.600">
              Moyenne: {data.panier_moyen.toFixed(2)} €/transaction
            </Text>
          )}
        </Box>
      );
    }
    return null;
  };

  const CustomContent = (props) => {
    const { x, y, width, height, index, name, value } = props;

    // Skip rendering if essential props are missing
    if (!x || !y || !width || !height || index === undefined) {
      return null;
    }

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: COLORS[index % COLORS.length],
            stroke: '#fff',
            strokeWidth: 2,
          }}
        />
        {width > 80 && height > 40 && name && value && (
          <>
            <text
              x={x + width / 2}
              y={y + height / 2 - 10}
              textAnchor="middle"
              fill="#fff"
              fontSize={14}
              fontWeight="bold"
            >
              {name}
            </text>
            <text
              x={x + width / 2}
              y={y + height / 2 + 10}
              textAnchor="middle"
              fill="#fff"
              fontSize={12}
            >
              {value?.toLocaleString('fr-FR')} €
            </text>
          </>
        )}
      </g>
    );
  };

  // Calculer la concentration client
  const concentrationText = React.useMemo(() => {
    if (!data?.clientsAnalysis || data.clientsAnalysis.length === 0) {
      return 'Aucune donnée client disponible';
    }

    const totalCA = data.clientsAnalysis.reduce((sum, client) => sum + client.chiffre_affaires, 0);
    
    if (totalCA === 0) return 'Aucun chiffre d\'affaires';

    const top3 = data.clientsAnalysis.slice(0, 3);
    const top3CA = top3.reduce((sum, client) => sum + client.chiffre_affaires, 0);
    const top3Percentage = Math.round((top3CA / totalCA) * 100);

    const topClient = data.clientsAnalysis[0];
    const topClientPercentage = Math.round((topClient.chiffre_affaires / totalCA) * 100);

    return `Concentration: Top 3 = ${top3Percentage}% du CA | Top client = ${topClientPercentage}%`;
  }, [data?.clientsAnalysis]);

  // Statistiques supplémentaires
  const stats = React.useMemo(() => {
    if (!data?.clientsAnalysis || data.clientsAnalysis.length === 0) {
      return null;
    }

    const totalCA = data.clientsAnalysis.reduce((sum, client) => sum + client.chiffre_affaires, 0);
    const totalTransactions = data.clientsAnalysis.reduce((sum, client) => sum + client.nombre_transactions, 0);
    const avgTransaction = totalCA / totalTransactions;

    return {
      totalClients: data.clientsAnalysis.length,
      totalCA,
      avgTransaction
    };
  }, [data?.clientsAnalysis]);

  if (loading) {
    return (
      <Box p={5} bg={bgColor} borderRadius="xl" boxShadow="sm" border="1px" borderColor="red.100">
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Skeleton height="28px" width="250px" />
        </Flex>
        <Skeleton height="400px" />
        <Skeleton height="20px" mt={2} />
      </Box>
    );
  }

  return (
    <Box p={5} bg={bgColor} borderRadius="xl" boxShadow="sm" border="1px" borderColor="red.100">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="xl" fontWeight="bold">
          Répartition du CA par client
        </Text>
        {stats && (
          <Text fontSize="sm" color="gray.600">
            {stats.totalClients} clients
          </Text>
        )}
      </Flex>

      {treemapData[0]?.children && treemapData[0].children.length > 0 ? (
        <>
          <ResponsiveContainer width="100%" height={400}>
            <Treemap
              data={treemapData}
              dataKey="size"
              aspectRatio={4 / 3}
              stroke="#fff"
              fill="#8884d8"
              content={<CustomContent />}
            >
              <Tooltip content={<CustomTooltip />} />
            </Treemap>
          </ResponsiveContainer>

          <Box mt={4}>
            <Text fontSize="sm" color="gray.600" textAlign="center" mb={1}>
              {concentrationText}
            </Text>
            {stats && (
              <Flex justifyContent="center" gap={4} fontSize="xs" color="gray.500">
                <Text>CA total: {stats.totalCA.toLocaleString('fr-FR')} €</Text>
                <Text>•</Text>
                <Text>Moyenne: {stats.avgTransaction.toFixed(2)} €/transaction</Text>
                <Text>•</Text>
                <Text>{stats.totalClients} clients actifs</Text>
              </Flex>
            )}
          </Box>
        </>
      ) : (
        <Box height="400px" display="flex" alignItems="center" justifyContent="center" flexDirection="column">
          <Text color="gray.500" textAlign="center" fontSize="lg" mb={2}>
            Aucune donnée de clients disponible
          </Text>
          <Text fontSize="sm" color="gray.400" textAlign="center">
            Les revenus seront analysés et regroupés par client automatiquement
          </Text>
        </Box>
      )}
    </Box>
  );
}

export default ClientDistributionChart;