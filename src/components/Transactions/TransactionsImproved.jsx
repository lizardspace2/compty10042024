import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { supabase } from '../../supabaseClient';
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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
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
  FaTimes,
  FaChevronRight,
  FaFileExcel,
  FaFileCsv,
  FaFilePdf,
  FaUpload,
  FaSave,
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
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const { isOpen: isDeleteJustificatifOpen, onOpen: onDeleteJustificatifOpen, onClose: onDeleteJustificatifClose } = useDisclosure();

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [justificatifToDelete, setJustificatifToDelete] = useState(null);
  const [editingFileName, setEditingFileName] = useState(null);
  const [newFileName, setNewFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef();
  const cancelRef = useRef();
  const cancelJustificatifRef = useRef();

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

  const handleDeleteClick = (transaction) => {
    setTransactionToDelete(transaction);
    onDeleteOpen();
  };

  const handleDeleteConfirm = async () => {
    if (!transactionToDelete) return;

    const { error } = await deleteTransaction(transactionToDelete.id);
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
    onDeleteClose();
    setTransactionToDelete(null);
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

  const handleEditTransaction = (transaction) => {
    setTransactionToEdit(transaction);
    onDetailOpen();
  };

  const removeFilter = (filterKey) => {
    setFilters(prev => ({ ...prev, [filterKey]: '' }));
  };

  const getActiveFilters = () => {
    const active = [];

    if (filters.type_transaction) {
      const labels = { recette: 'Recettes', depense: 'Dépenses', virement: 'Virements' };
      active.push({
        key: 'type_transaction',
        label: 'Type',
        value: labels[filters.type_transaction] || filters.type_transaction
      });
    }

    if (filters.moyen_paiement) {
      active.push({
        key: 'moyen_paiement',
        label: 'Moyen',
        value: getMoyenPaiementLabel(filters.moyen_paiement)
      });
    }

    if (filters.statut) {
      const labels = {
        en_attente: 'En attente',
        validee: 'Validée',
        rapprochee: 'Rapprochée',
        annulee: 'Annulée'
      };
      active.push({
        key: 'statut',
        label: 'Statut',
        value: labels[filters.statut] || filters.statut
      });
    }

    if (filters.date_debut) {
      active.push({
        key: 'date_debut',
        label: 'Du',
        value: new Date(filters.date_debut).toLocaleDateString('fr-FR')
      });
    }

    if (filters.date_fin) {
      active.push({
        key: 'date_fin',
        label: 'Au',
        value: new Date(filters.date_fin).toLocaleDateString('fr-FR')
      });
    }

    return active;
  };

  const activeFilters = getActiveFilters();

  // Fonction pour préparer les données d'export
  const prepareExportData = () => {
    return transactions.map(transaction => ({
      'Date': formatDate(transaction.date_transaction),
      'Libellé': transaction.libelle,
      'Type': getTypeLabel(transaction.type_transaction),
      'Catégorie': transaction.ventilations?.map(v => v.categorie_nom).join(', ') || '-',
      'Moyen de paiement': getMoyenPaiementLabel(transaction.moyen_paiement),
      'Montant (€)': transaction.type_transaction === 'depense'
        ? -Math.abs(transaction.montant_total)
        : Math.abs(transaction.montant_total),
      'Statut': getStatusLabel(transaction.statut),
      'Annotations': transaction.annotations || '-',
    }));
  };

  // Export en Excel
  const exportToExcel = () => {
    try {
      const data = prepareExportData();
      const ws = XLSX.utils.json_to_sheet(data);

      // Définir la largeur des colonnes
      const wscols = [
        { wch: 12 }, // Date
        { wch: 30 }, // Libellé
        { wch: 10 }, // Type
        { wch: 25 }, // Catégorie
        { wch: 18 }, // Moyen de paiement
        { wch: 12 }, // Montant
        { wch: 12 }, // Statut
        { wch: 30 }, // Annotations
      ];
      ws['!cols'] = wscols;

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Transactions');

      const filename = `transactions_${new Date().toLocaleDateString('fr-FR').replace(/\//g, '-')}.xlsx`;
      XLSX.writeFile(wb, filename);

      toast({
        title: 'Export réussi',
        description: 'Le fichier Excel a été téléchargé',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      console.error('Erreur lors de l\'export Excel:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible d\'exporter en Excel',
        status: 'error',
        duration: 3000,
      });
    }
  };

  // Export en CSV
  const exportToCSV = () => {
    try {
      const data = prepareExportData();
      const ws = XLSX.utils.json_to_sheet(data);
      const csv = XLSX.utils.sheet_to_csv(ws);

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);

      link.setAttribute('href', url);
      link.setAttribute('download', `transactions_${new Date().toLocaleDateString('fr-FR').replace(/\//g, '-')}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: 'Export réussi',
        description: 'Le fichier CSV a été téléchargé',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      console.error('Erreur lors de l\'export CSV:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible d\'exporter en CSV',
        status: 'error',
        duration: 3000,
      });
    }
  };

  // Export en PDF
  const exportToPDF = () => {
    try {
      const doc = new jsPDF('l', 'mm', 'a4'); // Format paysage

      // Titre
      doc.setFontSize(16);
      doc.text('Liste des Transactions', 14, 15);

      // Date d'export
      doc.setFontSize(10);
      doc.text(`Exporté le ${new Date().toLocaleDateString('fr-FR')}`, 14, 22);

      // Statistiques
      if (stats) {
        doc.text(`Total Recettes: ${stats.total_recettes.toLocaleString()} €`, 14, 28);
        doc.text(`Total Dépenses: ${stats.total_depenses.toLocaleString()} €`, 80, 28);
        doc.text(`Solde: ${stats.solde.toLocaleString()} €`, 150, 28);
      }

      // Préparer les données pour le tableau
      const tableData = transactions.map(transaction => [
        formatDate(transaction.date_transaction),
        transaction.libelle,
        getTypeLabel(transaction.type_transaction),
        transaction.ventilations?.map(v => v.categorie_nom).join(', ') || '-',
        getMoyenPaiementLabel(transaction.moyen_paiement),
        (transaction.type_transaction === 'depense' ? '-' : '') +
          Math.abs(transaction.montant_total).toLocaleString() + ' €',
        getStatusLabel(transaction.statut),
      ]);

      // Créer le tableau
      doc.autoTable({
        startY: 35,
        head: [['Date', 'Libellé', 'Type', 'Catégorie', 'Moyen', 'Montant', 'Statut']],
        body: tableData,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [220, 38, 38], textColor: 255 },
        alternateRowStyles: { fillColor: [255, 245, 245] },
        margin: { left: 14, right: 14 },
      });

      const filename = `transactions_${new Date().toLocaleDateString('fr-FR').replace(/\//g, '-')}.pdf`;
      doc.save(filename);

      toast({
        title: 'Export réussi',
        description: 'Le fichier PDF a été téléchargé',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      console.error('Erreur lors de l\'export PDF:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible d\'exporter en PDF',
        status: 'error',
        duration: 3000,
      });
    }
  };

  // Gestion des justificatifs
  const handleDeleteJustificatifClick = (justificatif, filePath) => {
    setJustificatifToDelete({ justificatif, filePath });
    onDeleteJustificatifOpen();
  };

  const handleDeleteJustificatifConfirm = async () => {
    if (!justificatifToDelete) return;

    const { justificatif, filePath } = justificatifToDelete;

    try {
      // Supprimer le fichier du storage
      const { error: storageError } = await supabase.storage
        .from('documents')
        .remove([filePath]);

      if (storageError) throw storageError;

      // Supprimer l'entrée de la base de données
      const { error: dbError } = await supabase
        .from('justificatifs')
        .delete()
        .eq('id', justificatif.id);

      if (dbError) throw dbError;

      toast({
        title: 'Succès',
        description: 'Justificatif supprimé',
        status: 'success',
        duration: 3000,
      });

      // Récupérer la transaction mise à jour directement depuis l'API
      const { data: updatedTransaction, error: fetchError } = await supabase
        .from('transactions')
        .select(`
          *,
          ventilations (
            id,
            categorie_nom,
            montant,
            pourcentage
          ),
          compte_bancaire:comptes_bancaires (
            id,
            nom_compte,
            nom_banque
          ),
          justificatifs (
            id,
            nom_fichier,
            type_fichier,
            taille_fichier,
            url_stockage,
            created_at
          )
        `)
        .eq('id', selectedTransaction.id)
        .single();

      if (!fetchError && updatedTransaction) {
        setSelectedTransaction(updatedTransaction);
      }

      // Recharger les transactions en arrière-plan
      loadTransactions();
    } catch (error) {
      console.error('Erreur lors de la suppression du justificatif:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer le justificatif',
        status: 'error',
        duration: 3000,
      });
    } finally {
      onDeleteJustificatifClose();
      setJustificatifToDelete(null);
    }
  };

  const handleRenameJustificatif = async (justificatifId) => {
    if (!newFileName.trim()) {
      toast({
        title: 'Erreur',
        description: 'Le nom de fichier ne peut pas être vide',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('justificatifs')
        .update({ nom_fichier: newFileName.trim() })
        .eq('id', justificatifId);

      if (error) throw error;

      toast({
        title: 'Succès',
        description: 'Justificatif renommé',
        status: 'success',
        duration: 3000,
      });

      setEditingFileName(null);
      setNewFileName('');

      // Récupérer la transaction mise à jour directement depuis l'API
      const { data: updatedTransaction, error: fetchError } = await supabase
        .from('transactions')
        .select(`
          *,
          ventilations (
            id,
            categorie_nom,
            montant,
            pourcentage
          ),
          compte_bancaire:comptes_bancaires (
            id,
            nom_compte,
            nom_banque
          ),
          justificatifs (
            id,
            nom_fichier,
            type_fichier,
            taille_fichier,
            url_stockage,
            created_at
          )
        `)
        .eq('id', selectedTransaction.id)
        .single();

      if (!fetchError && updatedTransaction) {
        setSelectedTransaction(updatedTransaction);
      }

      // Recharger les transactions en arrière-plan
      loadTransactions();
    } catch (error) {
      console.error('Erreur lors du renommage du justificatif:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de renommer le justificatif',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleUploadJustificatif = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0 || !selectedTransaction) return;

    setIsUploading(true);

    try {
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${selectedTransaction.id}_${Date.now()}.${fileExt}`;
        const filePath = `justificatifs/${fileName}`;

        // Upload vers Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('documents')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Récupérer l'URL publique
        const { data: { publicUrl } } = supabase.storage
          .from('documents')
          .getPublicUrl(filePath);

        // Enregistrer dans la base de données
        const { error: dbError } = await supabase
          .from('justificatifs')
          .insert([{
            transaction_id: selectedTransaction.id,
            nom_fichier: file.name,
            type_fichier: file.type,
            taille_fichier: file.size,
            url_stockage: publicUrl
          }]);

        if (dbError) throw dbError;
      }

      toast({
        title: 'Succès',
        description: `${files.length} justificatif(s) ajouté(s)`,
        status: 'success',
        duration: 3000,
      });

      // Récupérer la transaction mise à jour directement depuis l'API
      const { data: updatedTransaction, error: fetchError } = await supabase
        .from('transactions')
        .select(`
          *,
          ventilations (
            id,
            categorie_nom,
            montant,
            pourcentage
          ),
          compte_bancaire:comptes_bancaires (
            id,
            nom_compte,
            nom_banque
          ),
          justificatifs (
            id,
            nom_fichier,
            type_fichier,
            taille_fichier,
            url_stockage,
            created_at
          )
        `)
        .eq('id', selectedTransaction.id)
        .single();

      if (!fetchError && updatedTransaction) {
        setSelectedTransaction(updatedTransaction);
      }

      // Recharger les transactions en arrière-plan
      loadTransactions();
    } catch (error) {
      console.error('Erreur lors de l\'upload du justificatif:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible d\'ajouter le justificatif',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
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
            <Flex mb={4} gap={4} flexWrap="wrap">
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

              <Menu>
                <MenuButton
                  as={Button}
                  leftIcon={<FaDownload />}
                  variant="outline"
                  colorScheme="red"
                  isDisabled={transactions.length === 0}
                >
                  Exporter
                </MenuButton>
                <MenuList>
                  <MenuItem icon={<FaFileExcel />} onClick={exportToExcel}>
                    Excel (.xlsx)
                  </MenuItem>
                  <MenuItem icon={<FaFileCsv />} onClick={exportToCSV}>
                    CSV (.csv)
                  </MenuItem>
                  <MenuItem icon={<FaFilePdf />} onClick={exportToPDF}>
                    PDF (.pdf)
                  </MenuItem>
                </MenuList>
              </Menu>

              <Button
                leftIcon={<FaFilter />}
                variant={isFilterOpen ? 'solid' : 'outline'}
                colorScheme="red"
                onClick={onFilterToggle}
              >
                Filtres
                {activeFilters.length > 0 && (
                  <Badge
                    ml={2}
                    colorScheme="white"
                    bg="white"
                    color="red.600"
                    borderRadius="full"
                    px={2}
                    fontSize="xs"
                  >
                    {activeFilters.length}
                  </Badge>
                )}
              </Button>
            </Flex>

            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <Flex mb={6} gap={2} flexWrap="wrap" align="center">
                <Text fontSize="sm" fontWeight="medium" color="gray.600">
                  Filtres actifs :
                </Text>
                {activeFilters.map((filter) => (
                  <Badge
                    key={filter.key}
                    colorScheme="red"
                    borderRadius="full"
                    px={3}
                    py={1}
                    display="flex"
                    alignItems="center"
                    gap={2}
                    fontSize="sm"
                  >
                    <Text as="span" fontWeight="semibold">
                      {filter.label}:
                    </Text>
                    <Text as="span">
                      {filter.value}
                    </Text>
                    <IconButton
                      icon={<FaTimes />}
                      size="xs"
                      variant="ghost"
                      colorScheme="whiteAlpha"
                      aria-label={`Retirer le filtre ${filter.label}`}
                      onClick={() => removeFilter(filter.key)}
                      minW="auto"
                      h="auto"
                      p={0}
                      _hover={{ bg: 'red.600' }}
                    />
                  </Badge>
                ))}
                {activeFilters.length > 1 && (
                  <Button
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                    leftIcon={<FaTimes />}
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
                    Tout effacer
                  </Button>
                )}
              </Flex>
            )}

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
                              <MenuItem icon={<FaEdit />} onClick={() => handleEditTransaction(transaction)}>
                                Modifier
                              </MenuItem>
                              <MenuItem
                                icon={<FaTrash />}
                                color="red.600"
                                onClick={() => handleDeleteClick(transaction)}
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
            <Flex justify="space-between" align="center">
              <Text fontSize="xl" fontWeight="bold">Filtres</Text>
              <IconButton
                icon={<FaChevronRight />}
                aria-label="Fermer les filtres"
                size="sm"
                variant="ghost"
                colorScheme="red"
                onClick={onFilterToggle}
              />
            </Flex>

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
        onToggle={() => {
          onDetailClose();
          setTransactionToEdit(null);
        }}
        onTransactionAdded={async () => {
          // Refresh immediately in parallel
          await Promise.all([loadTransactions(), loadStats()]);
        }}
        transactionToEdit={transactionToEdit}
      />

      {/* Justificatifs Modal */}
      <Modal isOpen={isJustificatifsOpen} onClose={onJustificatifsClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex justify="space-between" align="center" pr={10}>
              <Text>Justificatifs - {selectedTransaction?.libelle}</Text>
              <Input
                type="file"
                ref={fileInputRef}
                display="none"
                multiple
                accept="image/*,application/pdf"
                onChange={handleUploadJustificatif}
              />
              <Button
                leftIcon={<FaUpload />}
                colorScheme="blue"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                isLoading={isUploading}
                loadingText="Upload..."
              >
                Ajouter
              </Button>
            </Flex>
          </ModalHeader>
          <ModalCloseButton top={4} />
          <ModalBody pb={6}>
            {selectedTransaction?.justificatifs && selectedTransaction.justificatifs.length > 0 ? (
              <VStack spacing={4} align="stretch">
                {selectedTransaction.justificatifs.map((justificatif) => (
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
                        {editingFileName === justificatif.id ? (
                          <HStack w="100%">
                            <Input
                              value={newFileName}
                              onChange={(e) => setNewFileName(e.target.value)}
                              size="sm"
                              autoFocus
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  handleRenameJustificatif(justificatif.id);
                                }
                              }}
                            />
                            <IconButton
                              icon={<FaSave />}
                              size="sm"
                              colorScheme="green"
                              onClick={() => handleRenameJustificatif(justificatif.id)}
                              aria-label="Sauvegarder"
                            />
                            <IconButton
                              icon={<FaTimes />}
                              size="sm"
                              onClick={() => {
                                setEditingFileName(null);
                                setNewFileName('');
                              }}
                              aria-label="Annuler"
                            />
                          </HStack>
                        ) : (
                          <HStack>
                            <FaPaperclip />
                            <Text fontWeight="medium">{justificatif.nom_fichier}</Text>
                            <IconButton
                              icon={<FaEdit />}
                              size="xs"
                              variant="ghost"
                              onClick={() => {
                                setEditingFileName(justificatif.id);
                                setNewFileName(justificatif.nom_fichier);
                              }}
                              aria-label="Renommer"
                            />
                          </HStack>
                        )}
                        <Text fontSize="sm" color="gray.600">
                          Type: {justificatif.type_fichier} • Taille: {(justificatif.taille_fichier / 1024).toFixed(2)} Ko
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          Ajouté le {new Date(justificatif.created_at).toLocaleDateString('fr-FR')}
                        </Text>
                      </VStack>
                      <HStack>
                        <Button
                          colorScheme="blue"
                          size="sm"
                          leftIcon={<FaFileAlt />}
                          onClick={() => window.open(justificatif.url_stockage, '_blank')}
                        >
                          Voir
                        </Button>
                        <IconButton
                          icon={<FaTrash />}
                          colorScheme="red"
                          size="sm"
                          onClick={() => {
                            // Extraire le chemin du fichier de l'URL
                            const urlParts = justificatif.url_stockage.split('/');
                            const filePath = `justificatifs/${urlParts[urlParts.length - 1]}`;
                            handleDeleteJustificatifClick(justificatif, filePath);
                          }}
                          aria-label="Supprimer"
                        />
                      </HStack>
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
                <Button
                  mt={4}
                  leftIcon={<FaUpload />}
                  colorScheme="blue"
                  onClick={() => fileInputRef.current?.click()}
                  isLoading={isUploading}
                >
                  Ajouter un justificatif
                </Button>
              </Flex>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              <HStack spacing={3}>
                <Box
                  bg="red.100"
                  p={2}
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <FaTrash size={20} color="#E53E3E" />
                </Box>
                <Text>Supprimer la transaction</Text>
              </HStack>
            </AlertDialogHeader>
            <AlertDialogCloseButton />

            <AlertDialogBody>
              <VStack align="stretch" spacing={4}>
                <Text>
                  Êtes-vous sûr de vouloir supprimer cette transaction ? Cette action est irréversible.
                </Text>
                {transactionToDelete && (
                  <Box
                    p={4}
                    bg="red.50"
                    borderRadius="lg"
                    border="1px"
                    borderColor="red.200"
                  >
                    <VStack align="start" spacing={2}>
                      <HStack justify="space-between" w="100%">
                        <Text fontSize="sm" color="gray.600">Libellé :</Text>
                        <Text fontSize="sm" fontWeight="semibold">{transactionToDelete.libelle}</Text>
                      </HStack>
                      <HStack justify="space-between" w="100%">
                        <Text fontSize="sm" color="gray.600">Montant :</Text>
                        <Text
                          fontSize="sm"
                          fontWeight="bold"
                          color={transactionToDelete.type_transaction === 'recette' ? 'green.600' : 'red.600'}
                        >
                          {transactionToDelete.type_transaction === 'depense' && '-'}
                          {Math.abs(transactionToDelete.montant_total).toLocaleString()} €
                        </Text>
                      </HStack>
                      <HStack justify="space-between" w="100%">
                        <Text fontSize="sm" color="gray.600">Date :</Text>
                        <Text fontSize="sm" fontWeight="semibold">
                          {formatDate(transactionToDelete.date_transaction)}
                        </Text>
                      </HStack>
                    </VStack>
                  </Box>
                )}
              </VStack>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Annuler
              </Button>
              <Button colorScheme="red" onClick={handleDeleteConfirm} ml={3}>
                Supprimer
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Delete Justificatif Confirmation Dialog */}
      <AlertDialog
        isOpen={isDeleteJustificatifOpen}
        leastDestructiveRef={cancelJustificatifRef}
        onClose={onDeleteJustificatifClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              <HStack spacing={3}>
                <Box
                  bg="red.100"
                  p={2}
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <FaFileAlt size={20} color="#E53E3E" />
                </Box>
                <Text>Supprimer le justificatif</Text>
              </HStack>
            </AlertDialogHeader>
            <AlertDialogCloseButton />

            <AlertDialogBody>
              <VStack align="stretch" spacing={4}>
                <Text>
                  Êtes-vous sûr de vouloir supprimer ce justificatif ? Cette action est irréversible.
                </Text>
                {justificatifToDelete && (
                  <Box
                    p={4}
                    bg="blue.50"
                    borderRadius="lg"
                    border="1px"
                    borderColor="blue.200"
                  >
                    <VStack align="start" spacing={2}>
                      <HStack spacing={2}>
                        <FaPaperclip color="#3182CE" />
                        <Text fontSize="sm" fontWeight="semibold">
                          {justificatifToDelete.justificatif.nom_fichier}
                        </Text>
                      </HStack>
                      <Text fontSize="sm" color="gray.600">
                        Type: {justificatifToDelete.justificatif.type_fichier}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        Taille: {(justificatifToDelete.justificatif.taille_fichier / 1024).toFixed(2)} Ko
                      </Text>
                    </VStack>
                  </Box>
                )}
              </VStack>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelJustificatifRef} onClick={onDeleteJustificatifClose}>
                Annuler
              </Button>
              <Button colorScheme="red" onClick={handleDeleteJustificatifConfirm} ml={3}>
                Supprimer
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}

export default TransactionsImproved;
