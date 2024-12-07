export default {
  hero: {
    title: "AI Fugatto - Create Unique Audio with AI",
    subtitle: "Transform text into audio and clone voices with advanced AI technology",
    input: {
      title: "Enter Your Text",
      placeholder: "Type your text here...",
      generate: "Generate Audio"
    },
    output: {
      title: "Generated Audio"
    }
  },
  features: {
    title: "Features",
    textToAudio: {
      title: "Text to Unique Audio",
      description: "Create never-before-heard sounds from simple text descriptions"
    },
    voiceCloning: {
      title: "Voice Cloning",
      description: "Clone your voice and make it sing or speak any text"
    }
  },
  pricing: {
    title: "Pricing",
    starter: {
      title: "Starter",
      price: "$9/month",
      features: ["Basic audio generation", "5 voice clones", "Standard support"]
    },
    pro: {
      title: "Professional",
      price: "$29/month",
      features: ["Advanced audio generation", "Unlimited voice clones", "Priority support"]
    }
  },
  footer: {
    copyright: "© 2024 AI Fugatto. All rights reserved.",
    contact: "Contact: jasonkui217@gmail.com",
    owner: "Created by Jason Yu"
  },
  errors: {
    noText: "Please enter some text to generate audio",
    apiKeyMissing: "API key not configured. Please contact support.",
    apiError: "Service temporarily unavailable. Please try again later.",
    networkError: "Network error. Please check your connection.",
    unknownError: "An unexpected error occurred. Please try again."
  },
  status: {
    generating: "Generating audio...",
    success: "Audio generated successfully!"
  }
}