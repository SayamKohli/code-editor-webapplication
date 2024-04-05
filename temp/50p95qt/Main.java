import java.util.Scanner;

class Main {
    public static void main(String[] args) {
    	
        Scanner input = new Scanner(System.in);
    	
        int number = input.nextInt();
        System.out.println("You entered " + number);

        // closing the scanner object
        input.close();
    }
}