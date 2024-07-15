package service.app.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.sun.org.apache.xpath.internal.operations.Bool;
import org.springframework.stereotype.Component;
import service.app.domain.TokenModel;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class TokenUtil {

        private static final long EXPIRE_TIME = 1000*60*60;
        private static final String SECRET_Token = "1f5sd4gw543s6dvfd8gsgw6w";

        //进行加密得到token
        public String getToken(TokenModel token)
        {
            Date date = new Date(System.currentTimeMillis()+EXPIRE_TIME);
            Algorithm algorithm = Algorithm.HMAC256(SECRET_Token);
            Map<String,Object> header = new HashMap<>(2);
            header.put("typ","JWT");
            header.put("alg","HS256");
            String jwt = JWT.create().withHeader(header)
                                .withClaim("username",token.getUsername())
                                .withClaim("lastLogin",token.getLastLogin())
                                .withExpiresAt(date)
                                .sign(algorithm);
//            System.out.println("---------------------------");
//            System.out.println(jwt);
            return jwt;
        }

        //对前端传过来的Token解码得到第二部分数据
        public TokenModel getTokenData(String jwt)
        {
            TokenModel token = new TokenModel();
            DecodedJWT tk = JWT.decode(jwt);

            token.setUsername(tk.getClaim("username").asString());
            token.setLastLogin(tk.getClaim("date").asDate());

            return token;
        }

        public String createToken(String username)
        {
            TokenModel tk = new TokenModel();
            tk.setUsername(username);
            tk.setLastLogin(new Date());

            return getToken(tk);
        }

        public void verifToken(String token)
        {
            JWTVerifier verifier = JWT.require(Algorithm.HMAC256(SECRET_Token)).build();
            verifier.verify(token);
        }



}
