---

id: steganography-algo  
sidebar_position: 9 
title: Steganography  
sidebar_label: Steganography  

---

### Definition:

Steganography is the practice of hiding secret data within a non-secret file or message in such a way that only the intended recipient can detect the presence of the hidden data. The most common use of steganography is concealing information within digital media, such as images, audio, or video files.

### Characteristics:

- **Hidden Information**:
  - Steganography conceals the presence of data by embedding it within an existing medium (image, audio, video), which appears unchanged to casual observers.

- **Security by Obscurity**:
  - Unlike cryptography, where the goal is to make data unreadable to unauthorized users, steganography aims to hide the existence of the data entirely.

- **Payload Capacity**:
  - The amount of data that can be hidden in a cover medium depends on the size of the medium and the method used. Larger files like images or audio files can hide more data.

- **Common Techniques**:
  - Popular methods of steganography include Least Significant Bit (LSB) embedding in images, where the secret data is embedded into the least important bits of each pixel.

### Time Complexity:

- **Embedding Time**: $O(n)$  
  Embedding data into a medium takes linear time with respect to the size of the data being embedded and the cover medium.

- **Extraction Time**: $O(n)$  
  The time to extract hidden information is also linear, depending on the size of the medium and the hidden data.

### Space Complexity:

- **Space Complexity**: $O(n)$  
  The space complexity is dependent on the cover medium, as the hidden data is stored within the existing space, usually with minimal increase in file size.

### Common Steganography Techniques:

1. **Least Significant Bit (LSB) Embedding**:
   - This method embeds secret data in the least significant bits of image pixels or audio samples. The human eye or ear cannot detect these minor changes, making it a widely used technique.

2. **Frequency Domain Embedding**:
   - In this technique, data is hidden in the frequency domain of an image or audio file, often using transformations like DCT (Discrete Cosine Transform) or FFT (Fast Fourier Transform).

3. **Spread Spectrum Techniques**:
   - Secret data is spread across multiple frequencies of the cover medium, making it more resistant to detection and tampering.

### C++ Implementation of Steganography (LSB Embedding Example in an Image):

```cpp
#include <iostream>
#include <opencv2/opencv.hpp>

void embedData(cv::Mat &image, const std::string &data) {
    int dataIdx = 0;
    for (int i = 0; i < image.rows; ++i) {
        for (int j = 0; j < image.cols; ++j) {
            if (dataIdx < data.size()) {
                // Embed one bit of data into the least significant bit of the pixel
                uchar &pixel = image.at<uchar>(i, j);
                pixel = (pixel & 0xFE) | (data[dataIdx++] & 0x01);
            }
        }
    }
}

int main() {
    cv::Mat image = cv::imread("cover_image.png", cv::IMREAD_GRAYSCALE);
    if (image.empty()) {
        std::cout << "Image not found!" << std::endl;
        return -1;
    }

    std::string secretData = "Hello";
    embedData(image, secretData);

    cv::imwrite("stego_image.png", image);
    std::cout << "Secret data embedded!" << std::endl;

    return 0;
}
```

### Explanation:

- **LSB Embedding**: This code demonstrates a simple form of steganography using Least Significant Bit (LSB) embedding. It hides a secret string (`Hello`) into the least significant bits of an image's pixel values.

---

### Graphical Representation of Steganography (LSB in Images):

A steganography graph visualizes the changes in pixel intensity before and after embedding secret data. The graph compares the pixel values of the cover image with the stego image (the image with hidden data).

### Steganography Graph Explanation:

- **X-Axis**: Represents the pixel positions in the image (e.g., the index of each pixel in a row of the image).
- **Y-Axis**: Represents the intensity or value of the pixels (ranging from 0 to 255 for grayscale images).
- **Cover Image**: Shows the original pixel intensity of the image.
- **Stego Image**: Displays the slight changes in pixel intensity after embedding the secret data using LSB.

---

This graph will show the subtle alterations in pixel values (typically the least significant bits), which would be imperceptible to the naked eye but are visible when viewed at a binary level.
