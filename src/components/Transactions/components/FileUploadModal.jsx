const { default: TransactionDetail } = require("./transactiondetail/TransactionDetail");
const { default: TransactionDetailHeader } = require("./transactiondetail/TransactionDetailHeader");

const FileUploadModal = ({ onClose, modalType }) => {
    // Depending on modalType, you can render different content or handle different logic
    // For simplicity, I'll just demonstrate how you can handle different titles for each modal type
    let modalTitle = '';
    switch (modalType) {
        case 'autre_depense':
            modalTitle = 'Autre dépense professionnelle';
            break;
        case 'autre_recette':
            modalTitle = 'Autre recette professionnelle';
            break;
        case 'depense_especes':
            modalTitle = 'Dépense en espèces';
            break;
        case 'recette_especes':
            modalTitle = 'Recette en espèces';
            break;
        default:
            modalTitle = 'Modal Title';
    }

    return (
        <Modal isOpen={true} onClose={onClose} size="full" overflow="auto">
            <ModalOverlay />
            <ModalContent m={0} maxW="100vw">
                <ModalHeader>{modalTitle}</ModalHeader>
                <Modal isOpen={isDetailOpen} onClose={onDetailToggle} size="full" overflow="auto">
                    <ModalOverlay />
                    <ModalContent m={0} maxW="100vw">
                        <TransactionDetailHeader onClose={onDetailToggle} />
                        <TransactionDetail />
                    </ModalContent>
                </Modal>
                <ModalCloseButton />
            </ModalContent>
        </Modal>
    );
};
