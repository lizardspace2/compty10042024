import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Button,
  Input,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Spinner,
  Text,
  HStack,
  VStack,
  InputGroup,
  InputLeftElement,
  useToast,
  useColorModeValue,
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Image,
  Tooltip,
} from '@chakra-ui/react';
import {
  FaSearch,
  FaFilter,
  FaPlus,
  FaDownload,
  FaEdit,
  FaTrash,
  FaEllipsisV,
  FaFileAlt,
  FaPaperclip,
  FaArrowUp,
  FaArrowDown,
  FaCreditCard,
  FaMoneyBillWave,
  FaUniversity,
  FaMoneyCheckAlt,
  FaExchangeAlt,
  FaCheckCircle,
  FaClock,
  FaBan,
  FaLink,
} from 'react-icons/fa';
import {
  getTransactions,
  getTransactionStats,
  deleteTransaction,
} from '../../services/transactionsService';
import { useEntreprise } from '../../contexts/EntrepriseContext';
import TransactionsHeader from './components/TransactionsHeader';
import TransactionDetailModal from './components/creertransaction/TransactionDetailModal';

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const months = ['jan', 'fév', 'mar', 'avr', 'mai', 'juin', 'juil', 'août', 'sep', 'oct', 'nov', 'déc'];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

function TransactionsImproved() {
  const { entreprise, loading: entrepriseLoading } = useEntreprise();
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type_transaction: '',
    moyen_paiement: '',
    statut: '',
    date_debut: '',
    date_fin: '',
  });
  const [page, setPage] = useState(0);
  const [limit] = useState(50);

  const { isOpen: isDetailOpen, onOpen: onDetailOpen, onClose: onDetailClose } = useDisclosure();
  const { isOpen: isFilterOpen, onToggle: onFilterToggle } = useDisclosure();
  const { isOpen: isJustificatifsOpen, onOpen: onJustificatifsOpen, onClose: onJustificatifsClose } = useDisclosure();

  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('red.100', 'gray.700');

  useEffect(() => {
    if (entreprise?.id) {
      loadTransactions();
      loadStats();
    }
  }, [entreprise, filters, searchTerm, page]);

  const loadTransactions = async () => {
    if (!entreprise?.id) return;

    setLoading(true);
    const { data, error } = await getTransactions(entreprise.id, {
      ...filters,
      search: searchTerm,
      limit,
      offset: page * limit,
    });

    if (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les transactions',
        status: 'error',
        duration: 3000,
      });
    } else {
      console.log('Transactions chargées:', data);
      // Debug: vérifier les justificatifs
      data?.forEach(t => {
        if (t.justificatifs && t.justificatifs.length > 0) {
          console.log(`Transaction ${t.libelle} a ${t.justificatifs.length} justificatif(s):`, t.justificatifs);
        }
      });
      setTransactions(data || []);
    }
    setLoading(false);
  };

  const loadStats = async () => {
    if (!entreprise?.id) return;

    const { data } = await getTransactionStats(entreprise.id);
    if (data) {
      setStats(data);
    }
  };

  if (entrepriseLoading) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Spinner size="xl" color="red.500" />
      </Flex>
    );
  }

  if (!entreprise) {
    return (
      <Box bg="gray.50" minH="100vh" p={6}>
        <Box maxWidth="600px" mx="auto" mt={20} p={8} bg="white" borderRadius="xl" boxShadow="lg" border="1px" borderColor="red.100">
          <VStack spacing={4} align="stretch">
            <Box textAlign="center" py={4}>
              <Text fontSize="2xl" fontWeight="bold" color="red.600" mb={2}>
                Configuration requise
              </Text>
              <Text fontSize="lg" color="gray.700" mb={4}>
                Pour accéder aux transactions, vous devez d'abord créer votre entreprise
              </Text>
            </Box>

            <Box bg="red.50" p={4} borderRadius="lg" border="1px" borderColor="red.200">
              <Text fontWeight="semibold" mb={2}>Que faire ?</Text>
              <VStack align="start" spacing={2} pl={4}>
                <HStack>
                  <Box w="6px" h="6px" bg="red.500" borderRadius="full" />
                  <Text fontSize="sm">Accédez à votre profil</Text>
                </HStack>
                <HStack>
                  <Box w="6px" h="6px" bg="red.500" borderRadius="full" />
                  <Text fontSize="sm">Remplissez les informations de votre entreprise</Text>
                </HStack>
                <HStack>
                  <Box w="6px" h="6px" bg="red.500" borderRadius="full" />
                  <Text fontSize="sm">Enregistrez votre entreprise</Text>
                </HStack>
              </VStack>
            </Box>

            <Button
              size="lg"
              colorScheme="red"
              onClick={() => window.location.href = '/profile'}
              mt={2}
            >
              Créer mon entreprise maintenant
            </Button>
          </VStack>
        </Box>
      </Box>
    );
  }

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette transaction ?')) {
      const { error } = await deleteTransaction(id);
      if (error) {
        toast({
          title: 'Erreur',
          description: 'Impossible de supprimer la transaction',
          status: 'error',
          duration: 3000,
        });
      } else {
        toast({
          title: 'Succès',
          description: 'Transaction supprimée',
          status: 'success',
          duration: 3000,
        });
        loadTransactions();
        loadStats();
      }
    }
  };

  const getStatusColor = (statut) => {
    switch (statut) {
      case 'validee':
        return 'green';
      case 'en_attente':
        return 'orange';
      case 'annulee':
        return 'red';
      case 'rapprochee':
        return 'blue';
      default:
        return 'gray';
    }
  };

  const getStatusIcon = (statut) => {
    switch (statut) {
      case 'validee':
        return <FaCheckCircle />;
      case 'en_attente':
        return <FaClock />;
      case 'annulee':
        return <FaBan />;
      case 'rapprochee':
        return <FaLink />;
      default:
        return null;
    }
  };

  const getStatusLabel = (statut) => {
    switch (statut) {
      case 'validee':
        return 'Validée';
      case 'en_attente':
        return 'En attente';
      case 'annulee':
        return 'Annulée';
      case 'rapprochee':
        return 'Rapprochée';
      default:
        return statut;
    }
  };

  const getTypeColor = (type) => {
    return type === 'recette' ? 'green' : 'red';
  };

  const getTypeIcon = (type) => {
    return type === 'recette' ? <FaArrowUp /> : <FaArrowDown />;
  };

  const getTypeLabel = (type) => {
    return type === 'recette' ? 'Recette' : 'Dépense';
  };

  const getMoyenPaiementIcon = (moyen) => {
    switch (moyen) {
      case 'carte':
        return <FaCreditCard />;
      case 'especes':
        return <FaMoneyBillWave />;
      case 'virement':
        return <FaUniversity />;
      case 'cheque':
        return <FaMoneyCheckAlt />;
      case 'prelevement':
        return <FaExchangeAlt />;
      default:
        return null;
    }
  };

  const getMoyenPaiementLabel = (moyen) => {
    switch (moyen) {
      case 'carte':
        return 'Carte bancaire';
      case 'especes':
        return 'Espèces';
      case 'virement':
        return 'Virement';
      case 'cheque':
        return 'Chèque';
      case 'prelevement':
        return 'Prélèvement';
      default:
        return '-';
    }
  };

  const getMoyenPaiementColor = (moyen) => {
    switch (moyen) {
      case 'carte':
        return 'purple';
      case 'especes':
        return 'green';
      case 'virement':
        return 'blue';
      case 'cheque':
        return 'orange';
      case 'prelevement':
        return 'teal';
      default:
        return 'gray';
    }
  };

  const handleViewJustificatifs = (transaction) => {
    setSelectedTransaction(transaction);
    onJustificatifsOpen();
  };

  return (
    <Box bg="gray.50" minH="100vh">
      <TransactionsHeader onToggleFilter={onFilterToggle} />

      {/* Stats Cards */}
      {stats && (
        <Box maxWidth="1600px" mx="auto" px={6} pt={6}>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6}>
            <GridItem>
              <Box p={5} bg="red.50" borderRadius="xl" boxShadow="sm" border="1px" borderColor="red.100">
                <Stat>
                  <StatLabel>Total Recettes</StatLabel>
                  <StatNumber color="green.600">{stats.total_recettes.toLocaleString()} €</StatNumber>
                  <StatHelpText>{stats.nombre_recettes} transactions</StatHelpText>
                </Stat>
              </Box>
            </GridItem>
            <GridItem>
              <Box p={5} bg="red.50" borderRadius="xl" boxShadow="sm" border="1px" borderColor="red.100">
                <Stat>
                  <StatLabel>Total Dépenses</StatLabel>
                  <StatNumber color="red.600">{stats.total_depenses.toLocaleString()} €</StatNumber>
                  <StatHelpText>{stats.nombre_depenses} transactions</StatHelpText>
                </Stat>
              </Box>
            </GridItem>
            <GridItem>
              <Box p={5} bg="red.50" borderRadius="xl" boxShadow="sm" border="1px" borderColor="red.100">
                <Stat>
                  <StatLabel>Solde Net</StatLabel>
                  <StatNumber color={stats.solde >= 0 ? 'green.600' : 'red.600'}>
                    {stats.solde.toLocaleString()} €
                  </StatNumber>
                  <StatHelpText>
                    <StatArrow type={stats.solde >= 0 ? 'increase' : 'decrease'} />
                    {((stats.total_recettes - stats.total_depenses) / stats.total_recettes * 100).toFixed(1)}%
                  </StatHelpText>
                </Stat>
              </Box>
            </GridItem>
            <GridItem>
              <Box p={5} bg="red.50" borderRadius="xl" boxShadow="sm" border="1px" borderColor="red.100">
                <Stat>
                  <StatLabel>Total Transactions</StatLabel>
                  <StatNumber>{stats.nombre_transactions}</StatNumber>
                  <StatHelpText>Cette période</StatHelpText>
                </Stat>
              </Box>
            </GridItem>
          </Grid>
        </Box>
      )}

      <Flex>
        {/* Main Content */}
        <Box flex="1" p={6} transition="margin 0.3s" marginRight={isFilterOpen ? "400px" : "0"}>
          <Box maxWidth="1600px" mx="auto">
            {/* Search and Actions */}
            <Flex mb={6} gap={4} flexWrap="wrap">
              <InputGroup maxW="400px">
                <InputLeftElement pointerEvents="none">
                  <FaSearch color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="Rechercher une transaction..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  bg={bgColor}
                />
              </InputGroup>

              <Button
                leftIcon={<FaPlus />}
                colorScheme="red"
                onClick={onDetailOpen}
              >
                Nouvelle transaction
              </Button>

              <Button
                leftIcon={<FaDownload />}
                variant="outline"
                colorScheme="red"
              >
                Exporter
              </Button>

              <Button
                leftIcon={<FaFilter />}
                variant={isFilterOpen ? 'solid' : 'outline'}
                colorScheme="red"
                onClick={onFilterToggle}
              >
                Filtres
              </Button>
            </Flex>

            {/* Transactions Table */}
            <Box bg={bgColor} borderRadius="xl" boxShadow="sm" border="1px" borderColor={borderColor} overflow="hidden">
              {loading ? (
                <Flex justify="center" align="center" h="400px">
                  <Spinner size="xl" color="red.500" />
                </Flex>
              ) : transactions.length === 0 ? (
                <Flex justify="center" align="center" h="400px" flexDirection="column">
                  <FaFileAlt size={48} color="gray" />
                  <Text mt={4} color="gray.600">Aucune transaction trouvée</Text>
                </Flex>
              ) : (
                <Table variant="simple">
                  <Thead bg="red.50">
                    <Tr>
                      <Th>Date</Th>
                      <Th>Libellé</Th>
                      <Th>Catégorie</Th>
                      <Th>Moyen de paiement</Th>
                      <Th isNumeric>Montant</Th>
                      <Th>Type</Th>
                      <Th>Statut</Th>
                      <Th textAlign="center">Justificatifs</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {transactions.map((transaction) => (
                      <Tr key={transaction.id} _hover={{ bg: 'red.25' }}>
                        <Td>
                          <Text fontWeight="medium">
                            {formatDate(transaction.date_transaction)}
                          </Text>
                        </Td>
                        <Td>
                          <VStack align="start" spacing={0}>
                            <Text fontWeight="medium">{transaction.libelle}</Text>
                            {transaction.annotations && (
                              <Text fontSize="sm" color="gray.600">{transaction.annotations}</Text>
                            )}
                          </VStack>
                        </Td>
                        <Td>
                          <VStack align="start" spacing={2}>
                            {transaction.ventilations?.slice(0, 2).map((v, index) => (
                              <HStack key={index} spacing={2}>
                                <Badge
                                  colorScheme="blue"
                                  fontSize="xs"
                                  borderRadius="full"
                                  px={3}
                                  py={1}
                                >
                                  {v.categorie_nom}
                                </Badge>
                                {transaction.ventilations.length > 1 && (
                                  <Badge
                                    colorScheme="gray"
                                    fontSize="xs"
                                    borderRadius="full"
                                    px={2}
                                    py={1}
                                    variant="subtle"
                                  >
                                    {v.pourcentage}%
                                  </Badge>
                                )}
                              </HStack>
                            ))}
                            {transaction.ventilations?.length > 2 && (
                              <Badge
                                colorScheme="gray"
                                fontSize="xs"
                                borderRadius="full"
                                px={2}
                                py={1}
                                variant="outline"
                              >
                                +{transaction.ventilations.length - 2} autre(s)
                              </Badge>
                            )}
                          </VStack>
                        </Td>
                        <Td>
                          {transaction.moyen_paiement ? (
                            <HStack spacing={2}>
                              <Badge
                                colorScheme={getMoyenPaiementColor(transaction.moyen_paiement)}
                                fontSize="xs"
                                borderRadius="full"
                                px={3}
                                py={1}
                                display="flex"
                                alignItems="center"
                                gap={2}
                              >
                                {getMoyenPaiementIcon(transaction.moyen_paiement)}
                                <Text as="span">{getMoyenPaiementLabel(transaction.moyen_paiement)}</Text>
                              </Badge>
                            </HStack>
                          ) : (
                            <Text fontSize="sm" color="gray.400">-</Text>
                          )}
                        </Td>
                        <Td isNumeric>
                          <Text
                            fontWeight="bold"
                            color={transaction.type_transaction === 'recette' ? 'green.600' : 'red.600'}
                          >
                            {transaction.type_transaction === 'depense' && '-'}
                            {Math.abs(transaction.montant_total).toLocaleString()} €
                          </Text>
                        </Td>
                        <Td>
                          <HStack spacing={2}>
                            <Badge
                              colorScheme={getTypeColor(transaction.type_transaction)}
                              fontSize="xs"
                              borderRadius="full"
                              px={3}
                              py={1}
                              display="flex"
                              alignItems="center"
                              gap={2}
                            >
                              {getTypeIcon(transaction.type_transaction)}
                              <Text as="span">{getTypeLabel(transaction.type_transaction)}</Text>
                            </Badge>
                          </HStack>
                        </Td>
                        <Td>
                          <HStack spacing={2}>
                            <Badge
                              colorScheme={getStatusColor(transaction.statut)}
                              fontSize="xs"
                              borderRadius="full"
                              px={3}
                              py={1}
                              display="flex"
                              alignItems="center"
                              gap={2}
                            >
                              {getStatusIcon(transaction.statut)}
                              <Text as="span">{getStatusLabel(transaction.statut)}</Text>
                            </Badge>
                          </HStack>
                        </Td>
                        <Td textAlign="center">
                          {transaction.justificatifs && transaction.justificatifs.length > 0 ? (
                            <Tooltip label={`${transaction.justificatifs.length} justificatif(s)`} hasArrow>
                              <IconButton
                                icon={<FaPaperclip />}
                                size="sm"
                                variant="ghost"
                                colorScheme="blue"
                                aria-label="Voir les justificatifs"
                                onClick={() => handleViewJustificatifs(transaction)}
                              />
                            </Tooltip>
                          ) : (
                            <Text fontSize="sm" color="gray.400">-</Text>
                          )}
                        </Td>
                        <Td>
                          <Menu>
                            <MenuButton
                              as={IconButton}
                              icon={<FaEllipsisV />}
                              variant="ghost"
                              size="sm"
                            />
                            <MenuList>
                              <MenuItem icon={<FaEdit />}>Modifier</MenuItem>
                              <MenuItem icon={<FaFileAlt />}>Voir justificatifs</MenuItem>
                              <MenuItem
                                icon={<FaTrash />}
                                color="red.600"
                                onClick={() => handleDelete(transaction.id)}
                              >
                                Supprimer
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              )}

              {/* Pagination */}
              {!loading && transactions.length > 0 && (
                <Flex justify="space-between" align="center" p={4} borderTop="1px" borderColor={borderColor}>
                  <Text fontSize="sm" color="gray.600">
                    Affichage {page * limit + 1} - {Math.min((page + 1) * limit, page * limit + transactions.length)}
                  </Text>
                  <HStack>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setPage(Math.max(0, page - 1))}
                      isDisabled={page === 0}
                    >
                      Précédent
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setPage(page + 1)}
                      isDisabled={transactions.length < limit}
                    >
                      Suivant
                    </Button>
                  </HStack>
                </Flex>
              )}
            </Box>
          </Box>
        </Box>

        {/* Filter Sidebar */}
        <Box
          pos="fixed"
          right={isFilterOpen ? "0" : "-400px"}
          top="0"
          h="100vh"
          w="400px"
          bg="red.50"
          boxShadow="xl"
          zIndex="overlay"
          transition="right 0.3s"
          borderLeft="1px"
          borderColor="red.100"
          p={6}
          overflowY="auto"
        >
          <VStack spacing={4} align="stretch">
            <Text fontSize="xl" fontWeight="bold">Filtres</Text>

            <Box>
              <Text mb={2} fontWeight="medium">Type de transaction</Text>
              <Select
                value={filters.type_transaction}
                onChange={(e) => setFilters({ ...filters, type_transaction: e.target.value })}
                bg="white"
              >
                <option value="">Tous</option>
                <option value="recette">Recettes</option>
                <option value="depense">Dépenses</option>
                <option value="virement">Virements</option>
              </Select>
            </Box>

            <Box>
              <Text mb={2} fontWeight="medium">Moyen de paiement</Text>
              <Select
                value={filters.moyen_paiement}
                onChange={(e) => setFilters({ ...filters, moyen_paiement: e.target.value })}
                bg="white"
              >
                <option value="">Tous</option>
                <option value="virement">Virement</option>
                <option value="carte">Carte bancaire</option>
                <option value="cheque">Chèque</option>
                <option value="especes">Espèces</option>
                <option value="prelevement">Prélèvement</option>
              </Select>
            </Box>

            <Box>
              <Text mb={2} fontWeight="medium">Statut</Text>
              <Select
                value={filters.statut}
                onChange={(e) => setFilters({ ...filters, statut: e.target.value })}
                bg="white"
              >
                <option value="">Tous</option>
                <option value="en_attente">En attente</option>
                <option value="validee">Validée</option>
                <option value="rapprochee">Rapprochée</option>
                <option value="annulee">Annulée</option>
              </Select>
            </Box>

            <Box>
              <Text mb={2} fontWeight="medium">Date début</Text>
              <Input
                type="date"
                value={filters.date_debut}
                onChange={(e) => setFilters({ ...filters, date_debut: e.target.value })}
                bg="white"
              />
            </Box>

            <Box>
              <Text mb={2} fontWeight="medium">Date fin</Text>
              <Input
                type="date"
                value={filters.date_fin}
                onChange={(e) => setFilters({ ...filters, date_fin: e.target.value })}
                bg="white"
              />
            </Box>

            <Button
              colorScheme="red"
              onClick={() => {
                setFilters({
                  type_transaction: '',
                  moyen_paiement: '',
                  statut: '',
                  date_debut: '',
                  date_fin: '',
                });
              }}
            >
              Réinitialiser les filtres
            </Button>
          </VStack>
        </Box>
      </Flex>

      {/* Transaction Detail Modal */}
      <TransactionDetailModal
        isDetailOpen={isDetailOpen}
        onToggle={onDetailClose}
        onTransactionAdded={async () => {
          // Refresh immediately in parallel
          await Promise.all([loadTransactions(), loadStats()]);
        }}
      />

      {/* Justificatifs Modal */}
      <Modal isOpen={isJustificatifsOpen} onClose={onJustificatifsClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Justificatifs - {selectedTransaction?.libelle}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedTransaction?.justificatifs && selectedTransaction.justificatifs.length > 0 ? (
              <VStack spacing={4} align="stretch">
                {selectedTransaction.justificatifs.map((justificatif, index) => (
                  <Box
                    key={justificatif.id}
                    p={4}
                    borderWidth="1px"
                    borderRadius="lg"
                    borderColor={borderColor}
                    bg={bgColor}
                  >
                    <Flex justify="space-between" align="center">
                      <VStack align="start" spacing={1} flex="1">
                        <HStack>
                          <FaPaperclip />
                          <Text fontWeight="medium">{justificatif.nom_fichier}</Text>
                        </HStack>
                        <Text fontSize="sm" color="gray.600">
                          Type: {justificatif.type_fichier} • Taille: {(justificatif.taille_fichier / 1024).toFixed(2)} Ko
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          Ajouté le {new Date(justificatif.created_at).toLocaleDateString('fr-FR')}
                        </Text>
                      </VStack>
                      <Button
                        colorScheme="blue"
                        size="sm"
                        leftIcon={<FaFileAlt />}
                        onClick={() => window.open(justificatif.url_stockage, '_blank')}
                      >
                        Voir
                      </Button>
                    </Flex>
                    {justificatif.type_fichier?.startsWith('image/') && (
                      <Box mt={4}>
                        <Image
                          src={justificatif.url_stockage}
                          alt={justificatif.nom_fichier}
                          maxH="400px"
                          objectFit="contain"
                          borderRadius="md"
                        />
                      </Box>
                    )}
                  </Box>
                ))}
              </VStack>
            ) : (
              <Flex justify="center" align="center" h="200px" flexDirection="column">
                <FaFileAlt size={48} color="gray" />
                <Text mt={4} color="gray.600">Aucun justificatif disponible</Text>
              </Flex>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default TransactionsImproved;
