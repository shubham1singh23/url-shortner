package com.shubham.url_shortner.utils;

import java.security.SecureRandom;

public class ShortCodeGenerator {
    private static final String CHARACTERS =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    private static final int CODE_LEN=6;

    private static final SecureRandom random =new SecureRandom();

    public static String generateCode(){
        StringBuilder code=new StringBuilder(CODE_LEN);

        for(int i=0;i<CODE_LEN;i++){
            int index =random.nextInt(CHARACTERS.length());
            code.append(CHARACTERS.charAt(index));
        }
        return code.toString();
    }
}
