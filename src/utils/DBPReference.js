import AsyncStorage from '@react-native-community/async-storage';

export default class DBPreference {
    static LOGIN_STATUS = "LoginStatus";
    static USER_NAME = "UserName";
    static EMAIL_ADDRESS = "EmailAddress"
    
    static retrieveData = async (key, callback) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value == null) {
                callback(false, false);
                return value;
            } else {
                callback(false, value);
                return value;
            }
        } catch (error) {
            console.log('DB error', error)
            // Error retrieving data
            callback(false, false);
            return error;
        }
    };

    //set data by key
    static setStoredData = async (key, value, callback) => {
        try {
            //console.warn('key'+key);
            //console.warn('value'+value);
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            callback(error, null);
            return error;
        }
    };

    //remove item
    static removeStoredData = async (key, callback) => {
        try {
            await AsyncStorage.removeItem(key);
            callback(false, true);
        }
        catch (error) {
            callback(true, error);
            return error;
        }
    };

}

