import React, { useState } from 'react';
import {
    Box,
    VStack,
    Text,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Textarea,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';

const FormulaireAvisCompty = () => {
    const [rating, setRating] = useState(0);
    const [suggestion, setSuggestion] = useState('');

    const handleSubmit = () => {
        // Handle the submission logic here
        console.log('Rating:', rating);
        console.log('Suggestion:', suggestion);
        // You would typically want to send this data to a server or process it as needed
    };

    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            p={5}
            bg={useColorModeValue('gray.100', 'gray.700')}
            m={4}
        >
            <VStack spacing={6}>
                <Text fontSize="lg" fontWeight="bold">
                    Votre avis sur Compty
                </Text>

                <Text>
                    Avant de continuer votre compte sur Compty, nous aimerions avoir votre ressenti.
                </Text>

                <Box w="full">
                    <Text mb={2}>
                        Recommanderiez-vous Compty à un ami ?
                    </Text>
                    <Slider
                        defaultValue={0}
                        min={0}
                        max={10}
                        step={1}
                        onChange={(val) => setRating(val)}
                    >
                        <SliderTrack>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb boxSize={6} />
                    </Slider>
                    <Box display="flex" justifyContent="space-between">
                        <Text fontSize="sm">Pas du tout</Text>
                        <Text fontSize="sm">Tout à fait</Text>
                    </Box>
                </Box>

                <Box w="full">
                    <Text mb={2}>
                        Si vous aviez une baguette magique, comment amélioreriez-vous Compty ?
                    </Text>
                    <Textarea
                        placeholder="Votre liste au père noël ici."
                        value={suggestion}
                        onChange={(e) => setSuggestion(e.target.value)}
                        size="sm"
                    />
                </Box>
                <Text fontSize="sm">
                    Pour aider Compty à grandir et à s'épanouir, parlez-en autour de vous, et soyez son ambassadeur sur les forums ou les groupes Facebook.
                </Text>
                <Box w="full" d="flex" justifyContent="space-between" mt={4}>
                    <Button colorScheme="red" variant="outline" onClick={() => setRating(0)}>
                        Annuler
                    </Button>
                    <Button colorScheme="green" variant="solid" onClick={handleSubmit}>
                        Envoyer
                    </Button>
                </Box>
            </VStack>
        </Box>
    );
};

export default FormulaireAvisCompty;
