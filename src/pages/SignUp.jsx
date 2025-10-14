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
  FormControl,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, CloseIcon } from "@chakra-ui/icons";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!email || !password || !confirmPassword) {
      toast({
        status: "error",
        title: "Erreur",
        description: "Veuillez remplir tous les champs.",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        status: "error",
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (password.length < 6) {
      toast({
        status: "error",
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 6 caractères.",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signUp(email.trim(), password);

      if (error) {
        console.error('Sign up error:', error);

        let errorMessage = error.message;

        if (error.message.includes("User already registered")) {
          errorMessage = "Un compte existe déjà avec cette adresse email.";
        } else if (error.message.includes("Password should be at least")) {
          errorMessage = "Le mot de passe doit contenir au moins 6 caractères.";
        }

        toast({
          status: "error",
          title: "Erreur d'inscription",
          description: errorMessage,
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          status: "success",
          title: "Inscription réussie",
          description: "Votre compte a été créé ! Veuillez vérifier votre email pour confirmer votre compte.",
          duration: 7000,
          isClosable: true,
        });
        navigate("/login");
      }
    } catch (err) {
      console.error('Unexpected error during sign up:', err);
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
            S'inscrire
          </Text>

          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
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
                    minLength={6}
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

              {/* Confirm Password input */}
              <FormControl>
                <InputGroup>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirmer le mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                    minLength={6}
                  />
                  <InputRightElement h={12}>
                    <IconButton
                      icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                      variant="ghost"
                      color="gray.400"
                      _hover={{ color: "gray.600" }}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              {/* Sign up button */}
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
                loadingText="Création du compte..."
                mt={2}
              >
                S'inscrire
              </Button>

              {/* Log in link */}
              <Text color="gray.500" fontSize="sm">
                Vous avez déjà un compte ?{" "}
                <Link to="/login">
                  <Text as="span" color="gray.900" fontWeight="semibold" _hover={{ textDecoration: "underline" }}>
                    Se connecter
                  </Text>
                </Link>
              </Text>

              {/* Legal notice */}
              <Text fontSize="xs" color="gray.400" textAlign="center">
                En vous inscrivant, vous acceptez nos{" "}
                <Text as="span" textDecoration="underline" cursor="pointer">
                  mentions légales
                </Text>
              </Text>
            </VStack>
          </form>
        </Box>
    </Box>
  );
};

export default SignUp;
