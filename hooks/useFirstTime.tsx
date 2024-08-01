import React, {useState, useEffect} from 'react';
import  AsyncStorage  from '@react-native-async-storage/async-storage'; 

export function useFirstTime() {
    const [isFirstTime, setIsFirstTime] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        async function checkFirstTime() {
            try {
                const hasOpened = await AsyncStorage.getItem("hasOpened");
                if (hasOpened === null) {
                    setIsFirstTime(true);
                } else {
                    setIsFirstTime(false);
                }
            } catch (error) {
                setIsFirstTime(true);
            } finally {
                setIsLoading(false);
            }
        }
        checkFirstTime();
    }, []);

    return { isFirstTime, isLoading };
}