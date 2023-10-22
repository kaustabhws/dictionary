import React, { createContext, useContext, useEffect, useState } from 'react';

const MyContext = createContext();

export const useMyContext = () => {
    return useContext(MyContext);
};

export const MyProvider = ({ children }) => {

    function getRandomWord(commonWords) {
        const randomIndex = Math.floor(Math.random() * commonWords.length);
        return commonWords[randomIndex];
    }

    const commonWords = [
        "Abandon",
        "Beautiful",
        "Courage",
        "Definition",
        "Exaggerate",
        "Fascinate",
        "Grace",
        "Happiness",
        "Integrity",
        "Juxtapose",
        "Knowledge",
        "Luminous",
        "Magnificent",
        "Nostalgia",
        "Opportunity",
        "Perseverance",
        "Quotidian",
        "Resilience",
        "Serendipity",
        "Tenacious"
    ];
    
    const [word, setWord] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
        title: '',
        message: '',
        resolution: ''
    })
    const updateMyState = (newValue) => {
        setWord(newValue.target.value);
    };

    const [def, setDef] = useState({
        phonetic: '',
        pronunciation: '',
        definitions: [],
        synonyms: [],
        word: ''
    });

    const wordSearch = async () => {
        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const result = await response.json();

            setWord('');
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            if (result && result.length > 0) {
                const allData = result[0].meanings.map((meaning) => {
                    const partOfSpeech = meaning.partOfSpeech;
                    const synonyms = meaning.synonyms
                    const definitions = meaning.definitions.map((definition) => ({
                        definition: definition.definition,
                        example: definition.example
                    }));
                    return { partOfSpeech, definitions, synonyms };
                });

                const allSynonyms = allData.flatMap((data) =>
                    data.definitions.flatMap((definition) => definition.synonyms)
                );

                setDef({
                    phonetic: result[0].phonetic,
                    pronunciation: result[0].phonetics[0]?.audio || '',
                    definitions: allData,
                    word: result[0].word,
                });

                console.log(def)
            } else if (response.status == 404) {
                setError(true);
                setErrorMessage({
                    title: result.title,
                    message: result.message,
                    resolution: result.resolution
                });
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <MyContext.Provider value={{ word, setWord, updateMyState, wordSearch, def, error, errorMessage }}>
            {children}
        </MyContext.Provider>
    );
};