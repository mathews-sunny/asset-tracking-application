import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n

  .use(LanguageDetector)

  .use(initReactI18next)

  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          description: {
            user: "User",
            email: "Email Address",
            firstName: "First Name",
            lastName: "Last Name",
            enterEmail: "Enter Email",
            send: "Send",
            reset: "Reset",
            invalidMail: "Enter a valid mail id!",
            invalidTld: "Invalid Top Level Domain!",
            invalidFirstName: "First Name should be atleast 3 characters!",
            invalidLastName: "Last Name should be atleast 3 characters!",
            warning: "Warning",
            resetUser:
              "Your entries will be lost! Do you want to reset User form?",
            registerUser: "Register User",
            loading: "Loading...",
            age: "Age",
            invalidAge: "Age should be greater than 18!",
            street: "Street",
            streetName: "Street Name",
            invalidStreet: "Street Name should not be empty!",
            houseNumber: "House Number",
            invalidHouseNumber: "House Number should not be empty!",
            zipCode: "Zip Code",
            invalidZipcode: "Invalid zip code",
            mandatoryZipcode: "Zip code is mandatory!",
            register: "Register",
            resetUserForm:
              "Your entries will be lost! Do you want to reset Register User form?",
            success: "Success",
            error: "Error",
            yes: "Yes",
            no: "No",
            serverDown: "Server Down!",
            wrong: "Something went wrong!",
            name: "Name : ",
            symbol: "Symbol : ",
            id: "Id : ",
            remove: "Remove",
            deleteAsset:
              "You are about to remove Asset from tracked assets! Do you want to continue?",
            apiSlow: "Assets Coincap Api is slow!",
            reloadAgain: "Try reload again.",
            reload: "Reload",
            userDetails: "User Details",
            address: "Address",
            addAsset: "Add Asset",
            idError : "Asset Id should not be empty!",
            enterId: "Enter Asset Id",
            assetName: "Asset Name",
            enterName: "Enter Asset Name",
            errorName: "Asset Name should be not be empty!",
            assetSymbol: "Asset Symbol",
            enterSymbol: "Enter Asset Symbol",
            errorSymbol: "Asset Symbol should be not be empty!",
            addAssets: "Add Assets",
            noAssets: "No Tracked Assets!",
            noAssetsMessage: "No assets added to tracked list? Use add asset to track assets or choose from all assets.",
            resetAsset: "Your entries will be lost! Do you want to reset Asset form?",
            trackedAssets: "Tracked Assets",
            assetsList: "Assets List",
            profile: "User Profile",
            mainPage: "Main Page",
            add: "Add",
          },
        },
      },
    },
  });

export default i18n;
