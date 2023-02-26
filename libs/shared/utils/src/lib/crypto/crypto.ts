import AES from "crypto-js/aes";
import CryptoJS from "crypto-js";

export const KEY = process.env["NX_CRYPTO_JS_KEY"] ?? "crypto";

/**
 * Encrypt auth data and set to cookie
 * @param authData
 * @return encrypted token
 */
export const encryptUserInfo = (authData: unknown) => {
	if (authData) {
		const authDataForLocalStorage = AES.encrypt(
			JSON.stringify(authData),
			KEY
		).toString();

		return authDataForLocalStorage;
	} else {
		throw Error("Data is empty");
	}
};

/**
 * Decrypt auth data
 * @param authData
 * @returns decrypted auth data or null
 */
export const decryptUserInfo = (authData: string): { access_token?: string } | null => {
	if (authData) {
		const decryptedAuthData = AES.decrypt(
			authData,
			KEY
		);
		return JSON.parse(decryptedAuthData.toString(CryptoJS.enc.Utf8));
	}

	return null;
};
