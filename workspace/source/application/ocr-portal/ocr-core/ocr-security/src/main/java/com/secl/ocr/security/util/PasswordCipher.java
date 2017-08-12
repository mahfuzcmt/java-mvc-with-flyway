package com.secl.ocr.security.util;

import java.security.spec.AlgorithmParameterSpec;
import java.security.spec.KeySpec;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.PBEParameterSpec;

import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class PasswordCipher {
	
	private final static Logger log = LoggerFactory.getLogger(PasswordCipher.class);
	public static Cipher dcipher, ecipher;
	private static String SECRET_KEY = "PBEWithMD5AndDES";

	public static void cipherMain()  { 
		String passPhrase = "";
        byte[] salt = { (byte) 0xA9, (byte) 0x9B, (byte) 0xC8, (byte) 0x32, (byte) 0x56, (byte) 0x34, (byte) 0xE3, (byte) 0x03 };
        int iterationCount = 19;
        try {
            KeySpec keySpec = new PBEKeySpec(passPhrase.toCharArray(), salt, iterationCount);
            SecretKey key = SecretKeyFactory.getInstance("PBEWithMD5AndDES").generateSecret(keySpec);
            ecipher = Cipher.getInstance(key.getAlgorithm());
            dcipher = Cipher.getInstance(key.getAlgorithm());
            AlgorithmParameterSpec paramSpec = new PBEParameterSpec(salt, iterationCount);
            ecipher.init(Cipher.ENCRYPT_MODE, key, paramSpec);
            dcipher.init(Cipher.DECRYPT_MODE, key, paramSpec);
        } catch (Exception e) {
        	log.error("An Exception occured : {}", e);
        } 
	}
	
    public static String encrypt(String str) {
       cipherMain();
       try {
           byte[] utf8 = str.getBytes("UTF8");
           byte[] enc = ecipher.doFinal(utf8);
           return Base64.encodeBase64String(enc);
       } catch (Exception e) {
       		log.error("An Exception occured while encryption : {}", e);
       }
       return null;
    }

    public static String decrypt(String str) {
       cipherMain();
       Cipher dcipher = null;
       try {
    	   byte[] salt = { (byte) 0xA9, (byte) 0x9B, (byte) 0xC8, (byte) 0x32, (byte) 0x56, (byte) 0x34, (byte) 0xE3, (byte) 0x03 };
           int iterationCount = 19;
           try {
        	   String passPhrase = "";
               KeySpec keySpec = new PBEKeySpec(passPhrase.toCharArray(), salt, iterationCount);
               SecretKey key = SecretKeyFactory.getInstance(SECRET_KEY).generateSecret(keySpec);
               dcipher = Cipher.getInstance(key.getAlgorithm());
               AlgorithmParameterSpec paramSpec = new PBEParameterSpec(salt, iterationCount);
               dcipher.init(Cipher.DECRYPT_MODE, key, paramSpec);
           } catch (Exception e) {
          		log.error("An Exception occured while decryption : {}", e);
           }
           byte[] dec = Base64.decodeBase64(str);
           byte[] utf8 = dcipher.doFinal(dec);
          return new String(utf8, "UTF8");
       } catch (Exception e) {
     		log.error("An Exception occured while decryption : {}", e);
       }
       return null;
    }
    
}
