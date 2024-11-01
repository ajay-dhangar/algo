import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.ArrayList;
import java.util.Random;

public class FlappyBirdGame extends JPanel implements ActionListener, KeyListener {
    private static final int WIDTH = 800, HEIGHT = 600;
    private int score = 0;
    private int birdY = HEIGHT / 2;
    private int velocity = 0;
    private boolean gameOver = false;
    private ArrayList<Rectangle> pipes;
    private Random random;
    private Timer timer;

    public FlappyBirdGame() {
        JFrame frame = new JFrame("Flappy Bird");
        frame.setSize(WIDTH, HEIGHT);
        frame.add(this);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setResizable(false);
        frame.setVisible(true);

        pipes = new ArrayList<>();
        random = new Random();
        timer = new Timer(20, this);  // 20 ms timer
        timer.start();

        addKeyListener(this);
        setFocusable(true);
        requestFocusInWindow();  // Ensure the JPanel is focused

        // Add initial pipes
        for (int i = 0; i < 4; i++) {
            addPipe(true);
        }
    }

    public void addPipe(boolean start) {
        int gap = 200;
        int pipeWidth = 100;
        int pipeHeight = 50 + random.nextInt(300);

        if (start) {
            pipes.add(new Rectangle(WIDTH + pipeWidth + pipes.size() * 300, HEIGHT - pipeHeight, pipeWidth, pipeHeight));
            pipes.add(new Rectangle(WIDTH + pipeWidth + (pipes.size() - 1) * 300, 0, pipeWidth, HEIGHT - pipeHeight - gap));
        } else {
            pipes.add(new Rectangle(pipes.get(pipes.size() - 1).x + 600, HEIGHT - pipeHeight, pipeWidth, pipeHeight));
            pipes.add(new Rectangle(pipes.get(pipes.size() - 1).x, 0, pipeWidth, HEIGHT - pipeHeight - gap));
        }
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        if (gameOver) {
            return;
        }

        velocity += 2;  // Gravity effect
        birdY += velocity;

        // Move pipes
        for (int i = 0; i < pipes.size(); i++) {
            Rectangle pipe = pipes.get(i);
            pipe.x -= 5;
        }

        // Remove pipes and add new ones
        if (pipes.get(0).x + pipes.get(0).width < 0) {
            pipes.remove(0);
            pipes.remove(0);
            addPipe(false);
        }

        // Check for collisions and increase score
        for (Rectangle pipe : pipes) {
            if (pipe.intersects(new Rectangle(WIDTH / 2 - 10, birdY, 20, 20))) {
                gameOver = true;
            }
            if (pipe.y == 0 && pipe.x + pipe.width / 2 < WIDTH / 2 - 10 && pipe.x + pipe.width / 2 > WIDTH / 2 - 15) {
                score++;
            }
        }

        // Check for ground collision
        if (birdY > HEIGHT || birdY < 0) {
            gameOver = true;
        }

        repaint();
    }

    @Override
    public void paintComponent(Graphics g) {
        super.paintComponent(g);
        g.setColor(Color.cyan);
        g.fillRect(0, 0, WIDTH, HEIGHT);

        g.setColor(Color.orange);
        g.fillRect(0, HEIGHT - 100, WIDTH, 100);

        g.setColor(Color.green);
        g.fillRect(0, HEIGHT - 100, WIDTH, 20);

        g.setColor(Color.red);
        g.fillOval(WIDTH / 2 - 10, birdY, 20, 20); // Draw the bird

        // Draw pipes
        for (Rectangle pipe : pipes) {
            g.setColor(Color.green.darker());
            g.fillRect(pipe.x, pipe.y, pipe.width, pipe.height);
        }

        // Display score
        g.setColor(Color.white);
        g.setFont(new Font("Arial", Font.BOLD, 20));
        g.drawString("Score: " + score, 10, 20);

        // Display game over message
        if (gameOver) {
            g.setFont(new Font("Arial", Font.BOLD, 50));
            g.drawString("Game Over", WIDTH / 2 - 150, HEIGHT / 2 - 50);
            g.setFont(new Font("Arial", Font.BOLD, 20));
            g.drawString("Press SPACE to Restart", WIDTH / 2 - 110, HEIGHT / 2);
        }
    }

    @Override
    public void keyPressed(KeyEvent e) {
        if (e.getKeyCode() == KeyEvent.VK_SPACE) {
            if (gameOver) {
                resetGame();
            } else {
                velocity = -10; // Bird jumps
            }
        }
    }

    public void resetGame() {
        birdY = HEIGHT / 2;
        velocity = 0;
        score = 0;
        pipes.clear();
        for (int i = 0; i < 4; i++) {
            addPipe(true);
        }
        gameOver = false;
    }

    @Override
    public void keyReleased(KeyEvent e) {}

    @Override
    public void keyTyped(KeyEvent e) {}

    public static void main(String[] args) {
        new FlappyBirdGame();
    }
}
