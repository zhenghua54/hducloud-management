package service.app.util;

import org.springframework.stereotype.Component;

import java.math.BigInteger;
import java.security.MessageDigest;

@Component
public class EncryptionUtil {

    public static final String KEY_SHA = "SHA";
    public static final String salt ="dsfs2435fgfdh2awf2ef";

    public String getResult(String str)
    {
        str = str.concat(salt);
        BigInteger sha =null;
        //System.out.println("=======加密前的数据:"+str);
        byte[] inputData = str.getBytes();
        try {
            MessageDigest messageDigest = MessageDigest.getInstance(KEY_SHA);
            messageDigest.update(inputData);
            sha = new BigInteger(messageDigest.digest());
            //System.out.println("SHA加密后:" + sha.toString(32));
        } catch (Exception e) {e.printStackTrace();}
        return sha.toString(32);
    }
}
