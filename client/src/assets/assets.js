import logo from "./logo.svg";
import { SquarePen, Hash, Image, Eraser, Scissors, FileText } from 'lucide-react';


export const assets = {
    logo,
};

export const icons = {
    SquarePen,
    Hash,
    Image,
    Eraser,
    Scissors,
    FileText
};

export const AiToolsData = [

    {
        title: 'AI Article Writer',
        description: 'Generate premium-quality, engaging articles on any topic with our AI writing technology.',
        Icon: SquarePen,
        bg: '#0f172a',
        path: '/ai/write-article'
    },


    {
        title: 'Blog Title Generator',
        description: 'Find the perfect, catchy title for your blog posts with our AI-powered generator.',
        Icon: Hash,
        bg: '#0f172a',
        path: '/ai/blog-titles'
    },


    {
        title: 'AI Image Generator',
        description: 'Create stunning visuals with our AI image generation tool, Experience the power of AI.',
        Icon: Image,
        bg: '#0f172a',
        path: '/ai/generate-images'
    },


    {
        title: 'Background Remover',
        description: 'Effortlessly remove backgrounds from your images with our AI-driven tool.',
        Icon: Eraser,
        bg: '#0f172a',
        path: '/ai/remove-background'
    },


    {
        title: 'Object Removal',
        description: 'Remove unwanted objects from your images seamlessly with our AI object removal tool.',
        Icon: Scissors,
        bg: '#0f172a',
        path: '/ai/remove-object'
    },


    {
        title: 'Resume Reviewer',
        description: 'Get your resume reviewed by AI to improve your chances of landing your dream job.',
        Icon: FileText,
        bg: '#0f172a',
        path: '/ai/review-resume'
    }

];

export const dummyCreationsData = [
    {
        id: 1,
        prompt: "AI-Generated Landscape",
        type: "AI Generated Image",  // for image type, use "image"
        created_at: "2025-08-05",
        content: "https://img.freepik.com/free-photo/magical-floating-island-fantasy-landscape_23-2151851411.jpg"  // image URL
    },
    {
        id: 2,
        prompt: "Blog Title: The Future of AI",
        type: "Blog Title",
        created_at: "2025-08-03",
        content: "Generated a catchy blog title using the Blog Title Generator."
    },
    {
  id: 3,
  prompt: "How to Improve Product Photography for Online Stores",
  type: "Article",
  created_at: "2025-08-02",
  content: `
# How to Improve Product Photography for Online Stores

In the world of e-commerce, first impressions matter. The quality of your product images can make or break a sale. When customers can’t physically touch or see your product, high-quality photographs become essential to communicate value, build trust, and encourage purchases. Whether you're a small business owner or a marketing professional, improving your product photography can significantly boost your online sales. 

In this article, we’ll walk through key strategies to elevate your product images and make your online store shine.

## 1. Use Natural Lighting Whenever Possible

Lighting is one of the most critical factors in photography. Natural light is ideal because it produces soft, even illumination that helps your product look true to life. Position your setup near a large window with indirect sunlight. Avoid harsh direct sunlight as it can create strong shadows and overexposed areas.

If natural light is not an option, invest in affordable artificial lighting like softbox lights or ring lights. These help create consistent, diffused lighting that highlights your product's details.

## 2. Keep the Background Clean and Simple

A clutter-free background ensures your product remains the center of attention. White or light-colored backgrounds are popular choices for e-commerce because they provide contrast and create a professional, clean look.

You can use a white sweep (a curved backdrop with no edges) or plain foam boards. If you need to remove or replace backgrounds, tools like Photoshop or online background removers work well but start with a neat physical setup for best results.

## 3. Stabilize Your Camera with a Tripod

Blurred images from shaky hands can turn potential buyers away. Using a tripod keeps your camera stable and ensures crisp, clear shots. It also lets you keep consistent framing and angle across multiple product photos, which looks more professional and cohesive on your site.

## 4. Focus on Product Details

Customers want to see what they're buying. Close-up shots focusing on textures, materials, logos, or unique features help build trust and reduce uncertainty.

Try different angles and zoom in on important parts that set your product apart. For example, if you sell clothing, highlight stitching or fabric patterns; if electronics, focus on ports or buttons.

## 5. Edit Photos with Care

Editing helps enhance the quality of your photos but should be done thoughtfully. Adjust brightness, contrast, and color balance to reflect the product accurately.

Remove distracting spots or imperfections without altering the product itself. Over-editing can mislead customers and lead to returns or negative reviews.

## 6. Show Multiple Angles and Context

Provide your customers with a full understanding of the product by showing it from different viewpoints — front, back, sides, and close-ups. Additionally, lifestyle shots or images of the product in use can help customers visualize its size and purpose.

## 7. Maintain Consistency Across All Images

Consistency is key to a polished online store. Use the same lighting setup, background, and camera settings for all product photos to create a unified brand image. This uniformity improves your store’s professionalism and makes browsing easier for customers.

## Conclusion

Investing time and effort into product photography pays off by attracting more visitors, building trust, and increasing conversions. By applying these tips — from using natural light to maintaining consistent styles — your product images will stand out in the crowded online marketplace.

Remember, a great product photo isn’t just a picture; it’s a powerful sales tool. Start improving your product photography today and watch your online store grow.

---

*Written by Nexon AI Team — helping you transform ideas into reality.*  
`
}
];



export const dummyPublishedCreationData = [
  {
    id: 1,
    content: "https://static.vecteezy.com/system/resources/previews/030/622/980/non_2x/a-futuristic-cityscape-with-flying-cars-free-photo.jpg",
    prompt: "A futuristic city skyline with flying cars",
    style: "Realistic",
    likes: ["user_123", "user_456"],
    author: {
      id: "user_789",
      name: "Alice"
    },
    created_at: "2025-08-10T14:30:00Z"
  },
  {
    id: 2,
    content: "https://pbs.twimg.com/media/FlpLHIRXkAoqvzm.jpg",
    prompt: "A cozy Ghibli-style forest cottage",
    style: "Ghibli",
    likes: ["user_123", "user_789"],
    author: {
      id: "user_456",
      name: "Bob"
    },
    created_at: "2025-08-09T11:15:00Z"
  },
  {
    id: 3,
    content: "https://images.stockcake.com/public/0/9/0/09025375-5cbe-4980-8c74-f56a8c49ea93_large/futuristic-robot-portrait-stockcake.jpg",
    prompt: "Futuristic robot in a cyberpunk city",
    style: "Portrait",
    likes: ["user_456"],
    author: {
      id: "user_123",
      name: "Carol"
    },
    created_at: "2025-08-08T09:45:00Z"
  }
];
