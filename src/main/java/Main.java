import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        System.out.println("=================================================");
        System.out.println("    ¡BIENVENIDO A TU APLICACIÓN CI/CD JAVA!    ");
        System.out.println("=================================================");

        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        System.out.println("Fecha y Hora de Ejecución: " + dtf.format(LocalDateTime.now()));
        System.out.println("Entorno de Ejecución: Jenkins Agent");
        System.out.println("-------------------------------------------------");

        String[] tecnologias = {"Java 17", "Apache Maven", "Jenkins Pipeline", "SonarQube", "Git & GitHub"};
        System.out.println("Stack del Proyecto:");
        for (int i = 0; i < tecnologias.length; i++) {
            System.out.println("  [" + (i + 1) + "] " + tecnologias[i]);
        }

        System.out.println("=================================================");
        System.out.println(" ¡Pipeline CI/CD ejecutado y verificado con éxito!");
        System.out.println("=================================================");
    }
}