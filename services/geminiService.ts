
import { ActivityContent, StoryNode, ScienceExperiment, Grade } from "../types.ts";

const STATIC_CONTENT = {
  Math: {
    1: [
      {
        title: "Counting Stars",
        description: "Counting objects up to 20.",
        question: "How many sides does a triangle have?",
        options: ["2", "3", "4"],
        answer: "3",
        funFact: "A triangle is the strongest shape in building bridges!"
      }
    ],
    2: [
      {
        title: "Magic Addition",
        description: "Adding 3-digit numbers with carrying!",
        question: "What is 345 + 155?",
        options: ["500", "490", "510"],
        answer: "500",
        funFact: "The number zero was discovered in India by Aryabhata!"
      },
      {
        title: "Place Value Fun",
        description: "Identify hundreds, tens and ones.",
        question: "In the number 782, what is the value of 7?",
        options: ["7", "70", "700"],
        answer: "700",
        funFact: "The word 'digit' comes from the Latin word for finger!"
      },
      {
        title: "Multiplication Table",
        description: "Basic multiplication for beginners.",
        question: "What is 5 times 4?",
        options: ["15", "20", "25"],
        answer: "20",
        funFact: "Anything multiplied by zero is always zero!"
      }
    ]
  },
  EVS: {
    2: [
      {
        title: "Our Internal Organs",
        description: "The hard workers inside your body.",
        question: "Which organ pumps blood to all parts of your body?",
        options: ["Lungs", "Brain", "Heart"],
        answer: "Heart",
        funFact: "Your heart pumps about 2,000 gallons of blood every single day!"
      },
      {
        title: "Neighborhood Helpers",
        description: "People who keep our city running.",
        question: "Who uses a hose and a ladder to put out fires?",
        options: ["Doctor", "Police Officer", "Firefighter"],
        answer: "Firefighter",
        funFact: "Modern fire engines can carry up to 1,000 gallons of water!"
      },
      {
        title: "Safety at Home",
        description: "Rules to stay happy and safe.",
        question: "Should we play with sharp objects like knives or scissors?",
        options: ["Yes, for fun", "Only with friends", "No, never"],
        answer: "No, never",
        funFact: "Safety rules help us enjoy our play without getting hurt!"
      }
    ]
  },
  Science: {
    2: [
      {
        title: "The Life of a Plant",
        description: "How a tiny seed grows into a big tree.",
        materials: ["Clear cup", "Wet cotton", "Bean seed"],
        steps: ["Place wet cotton in cup", "Tuck the seed inside", "Keep it in the sun"],
        explanation: "Seeds need water, air, and sunlight to germinate into plants!",
        videoPrompt: "A seedling sprouting"
      },
      {
        title: "States of Matter",
        description: "Solid, Liquid, and Gas.",
        materials: ["Ice cube", "Bowl", "Warm window"],
        steps: ["Put ice in the bowl", "Watch it melt into water", "Wait for the water to dry up"],
        explanation: "Ice is a solid, water is a liquid, and steam is a gas!",
        videoPrompt: "Ice turning to water"
      }
    ]
  },
  Stories: {
    2: [
      {
        text: "In the magical forest of ICSE, a brave squirrel named Nutty found a map to the Great Oak Tree. Suddenly, the path split in two!",
        illustrationPrompt: "A squirrel looking at a map in a forest",
        options: [
          { text: "Go through the Whispering Flowers", nextPrompt: "flowers" },
          { text: "Cross the Giggling Brook", nextPrompt: "brook" }
        ],
        isEnd: false
      }
    ]
  }
};

export const getStoryNode = async (grade: Grade, prompt: string, history: string[] = []): Promise<StoryNode> => {
  const stories = (STATIC_CONTENT.Stories as any)[grade] || STATIC_CONTENT.Stories[2];
  if (prompt === "flowers") {
    return {
      text: "The flowers told Nutty a funny joke! He laughed so hard he fell into a pile of soft leaves and found a golden acorn. The End!",
      illustrationPrompt: "Happy squirrel with a golden acorn",
      options: [],
      isEnd: true
    };
  }
  if (prompt === "brook") {
    return {
      text: "The water was ticklish! Nutty hopped across the stones and met a friendly turtle who gave him a ride to the Great Oak. Success!",
      illustrationPrompt: "Squirrel riding on a turtle",
      options: [],
      isEnd: true
    };
  }
  return stories[0];
};

export const generateKidImage = async (prompt: string): Promise<string> => {
  const seed = prompt.split(' ').pop() || 'kid';
  return `https://picsum.photos/seed/${seed}/600/600`;
};

export const getScienceExperiment = async (grade: Grade, topic: string): Promise<ScienceExperiment> => {
  const experiments = (STATIC_CONTENT.Science as any)[grade] || STATIC_CONTENT.Science[2];
  const found = experiments.find((e: any) => e.title.includes(topic)) || experiments[0];
  return found;
};

export const getMathChallenge = async (grade: Grade, type: string): Promise<ActivityContent> => {
  const problems = (STATIC_CONTENT.Math as any)[grade] || (STATIC_CONTENT.Math as any)[2];
  return problems[Math.floor(Math.random() * problems.length)];
};

export const getEVSTopic = async (grade: Grade, topic: string): Promise<ActivityContent> => {
  const topics = (STATIC_CONTENT.EVS as any)[grade] || (STATIC_CONTENT.EVS as any)[2];
  const found = topics.find((t: any) => t.title.includes(topic)) || topics[0];
  return found;
};

export const speakText = async (text: string): Promise<void> => {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.pitch = 1.1;
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
};
