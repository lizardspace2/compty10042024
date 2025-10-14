import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Text,
  VStack,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, CloseIcon } from "@chakra-ui/icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const { signIn, resetPassword } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!email || !password) {
      toast({
        status: "error",
        title: "Erreur",
        description: "Veuillez remplir tous les champs.",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      console.log('Attempting login with email:', email.trim());
      const { error } = await signIn(email.trim(), password);

      if (error) {
        console.error('Login error details:', {
          message: error.message,
          status: error.status,
          name: error.name,
        });

        let errorMessage = error.message;

        if (error.message.includes("Invalid login credentials")) {
          errorMessage = "Email ou mot de passe incorrect. Assurez-vous que votre compte est bien créé et que votre email est confirmé.";
        } else if (error.message.includes("Email not confirmed")) {
          errorMessage = "Veuillez vérifier votre email pour confirmer votre compte avant de vous connecter.";
        }

        toast({
          status: "error",
          title: "Erreur de connexion",
          description: errorMessage,
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          status: "success",
          title: "Connexion réussie",
          description: "Vous êtes maintenant connecté !",
          duration: 3000,
          isClosable: true,
        });
        navigate("/");
      }
    } catch (err) {
      console.error('Unexpected error during login:', err);
      toast({
        status: "error",
        title: "Erreur",
        description: "Une erreur inattendue s'est produite.",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  const handleForgotPassword = async () => {
    if (!resetEmail) {
      toast({
        status: "error",
        title: "Erreur",
        description: "Veuillez entrer votre adresse email.",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsResetting(true);

    try {
      const { error } = await resetPassword(resetEmail.trim());

      if (error) {
        console.error('Password reset error:', error);
        toast({
          status: "error",
          title: "Erreur",
          description: error.message || "Impossible d'envoyer l'email de réinitialisation.",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          status: "success",
          title: "Email envoyé",
          description: "Un lien de réinitialisation a été envoyé à votre adresse email.",
          duration: 5000,
          isClosable: true,
        });
        setShowForgotPassword(false);
        setResetEmail("");
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast({
        status: "error",
        title: "Erreur",
        description: "Une erreur inattendue s'est produite.",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, gray.50, gray.100)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
        <Box
          bg="white"
          borderRadius="3xl"
          boxShadow="2xl"
          w="full"
          maxW="md"
          p={8}
          position="relative"
          border="1px"
          borderColor="gray.100"
        >
          {/* Close button */}
          <IconButton
            icon={<CloseIcon />}
            position="absolute"
            top={6}
            left={6}
            variant="ghost"
            color="gray.400"
            _hover={{ color: "gray.600", transform: "scale(1.1)" }}
            onClick={handleClose}
            aria-label="Fermer"
            size="sm"
          />

          {/* Logo */}
          <Box display="flex" justifyContent="center" mb={6}>
            <Text color="red.500" fontSize="4xl" fontWeight="bold">
              Compty
            </Text>
          </Box>

          {/* Title */}
          <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="gray.900" mb={8}>
            Se connecter
          </Text>

          <form onSubmit={handleSubmit}>
            <VStack spacing={6}>
              {/* Email input */}
              <FormControl>
                <Input
                  type="email"
                  placeholder="Adresse e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  h={12}
                  px={4}
                  borderColor="gray.300"
                  borderRadius="xl"
                  _focus={{
                    borderColor: "red.400",
                    boxShadow: "0 0 0 1px var(--chakra-colors-red-400)",
                  }}
                  disabled={isLoading}
                />
              </FormControl>

              {/* Password input */}
              <FormControl>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    h={12}
                    px={4}
                    pr={12}
                    borderColor="gray.300"
                    borderRadius="xl"
                    _focus={{
                      borderColor: "red.400",
                      boxShadow: "0 0 0 1px var(--chakra-colors-red-400)",
                    }}
                    disabled={isLoading}
                  />
                  <InputRightElement h={12}>
                    <IconButton
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      variant="ghost"
                      color="gray.400"
                      _hover={{ color: "gray.600" }}
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              {/* Forgot password link */}
              <Box w="full" textAlign="right">
                <Button
                  variant="link"
                  color="pink.500"
                  fontSize="sm"
                  fontWeight="medium"
                  onClick={() => setShowForgotPassword(true)}
                  _hover={{ textDecoration: "underline" }}
                >
                  Mot de passe oublié ?
                </Button>
              </Box>

              {/* Login button */}
              <Button
                type="submit"
                w="full"
                h={12}
                bgGradient="linear(to-r, red.400, red.500)"
                _hover={{ bgGradient: "linear(to-r, red.500, red.600)" }}
                color="white"
                fontWeight="semibold"
                borderRadius="xl"
                boxShadow="lg"
                isLoading={isLoading}
                loadingText="Connexion en cours..."
              >
                Se connecter
              </Button>

              {/* Sign up link */}
              <Text color="gray.500" fontSize="sm">
                Vous n'avez pas de compte ?{" "}
                <Link to="/signup">
                  <Text as="span" color="gray.900" fontWeight="semibold" _hover={{ textDecoration: "underline" }}>
                    S'inscrire
                  </Text>
                </Link>
              </Text>

              {/* Legal notice */}
              <Text fontSize="xs" color="gray.400" textAlign="center">
                En vous connectant, vous acceptez nos{" "}
                <Text as="span" textDecoration="underline" cursor="pointer">
                  mentions légales
                </Text>
              </Text>
            </VStack>
          </form>
        </Box>

      {/* Forgot Password Modal */}
      <Modal isOpen={showForgotPassword} onClose={() => setShowForgotPassword(false)} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="2xl" mx={4}>
          <ModalHeader fontSize="2xl" fontWeight="bold" textAlign="center">
            Mot de passe oublié ?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={4}>
            <Text textAlign="center" color="gray.600" mb={4}>
              Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
            </Text>
            <Input
              type="email"
              placeholder="Votre adresse email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              h={12}
              px={4}
              borderColor="gray.300"
              borderRadius="xl"
              _focus={{
                borderColor: "red.400",
                boxShadow: "0 0 0 1px var(--chakra-colors-red-400)",
              }}
              disabled={isResetting}
            />
          </ModalBody>
          <ModalFooter justifyContent="center" gap={2}>
            <Button
              variant="outline"
              onClick={() => {
                setShowForgotPassword(false);
                setResetEmail("");
              }}
              disabled={isResetting}
              borderRadius="xl"
            >
              Annuler
            </Button>
            <Button
              bgGradient="linear(to-r, red.400, red.500)"
              _hover={{ bgGradient: "linear(to-r, red.500, red.600)" }}
              color="white"
              borderRadius="xl"
              onClick={handleForgotPassword}
              isLoading={isResetting}
              loadingText="Envoi en cours..."
            >
              Envoyer le lien
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Login;
