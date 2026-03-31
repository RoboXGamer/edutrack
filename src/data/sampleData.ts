export type Question = {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

export const sampleData = {
  name: "Ancient History",
  courseData: {
    units: [
      {
        id: 1,
        name: "Pre-Historic Time",
        icon: "🦴",
        lessons: [
          {
            id: 1,
            unitId: 1,
            title: "Sources of Pre History",
            duration: "20m",
            type: "lesson",
            mcqs: 8,
            content:
              "Pre-history refers to the period before the invention of writing. The study of pre-history relies on archaeological sources, including tools, pottery, cave paintings, and fossils. These sources help historians understand how early humans lived, hunted, and organized their societies.\n\nArchaeological excavations at sites like Bhimbetka, Hunsgi, and Mehrgarh have provided crucial evidence about prehistoric India. Stone tools, microliths, and megalithic structures serve as primary sources. Radiocarbon dating and other scientific methods help establish chronologies.\n\nThe sources of pre-history can be classified into: (1) Archaeological sources - tools, weapons, pottery, ornaments, (2) Geological sources - rock formations, soil layers, (3) Biological sources - fossils, skeletal remains, (4) Anthropological sources - study of living tribal communities whose lifestyle resembles prehistoric patterns.",
          },
          {
            id: 2,
            unitId: 1,
            title: "Pre-Historic Society",
            duration: "8m",
            type: "lesson",
            mcqs: 8,
            content:
              "Prehistoric society was characterized by small groups of hunter-gatherers who lived in caves or temporary shelters. These communities were typically nomadic, moving from place to place in search of food and water.\n\nSocial organization was based on kinship ties and the division of labor between men and women. Men primarily hunted while women gathered plant foods, roots, and fruits. The discovery of fire was a transformative event that changed social dynamics, enabling cooking, warmth, and protection from predators.\n\nAs communities grew, social hierarchies began to emerge. Evidence of burial practices suggests beliefs about the afterlife, while cave paintings indicate artistic expression and possibly religious rituals. The transition from food-gathering to food-producing marked the beginning of settled life.",
          },
          {
            id: 3,
            unitId: 1,
            title: "Prehistoric Art",
            duration: "5m",
            type: "lesson",
            mcqs: 6,
            content:
              "Prehistoric art in India is best represented by the cave paintings of Bhimbetka in Madhya Pradesh, which date back to approximately 30,000 years ago. These paintings depict hunting scenes, dancing, and daily life activities using natural pigments.\n\nThe colors used include red ochre, white chalk, and green made from plant extracts. Animals like bison, deer, elephants, and tigers are commonly depicted. Human figures are shown in dynamic poses, suggesting movement and activity.\n\nRock art has been found across India - from Kashmir to Tamil Nadu. The art evolved from simple geometric patterns in the Paleolithic period to more complex narrative scenes in the Mesolithic period, and eventually to agricultural themes in the Neolithic period.",
          },
          {
            id: 4,
            unitId: 1,
            title: "Practice Sheet 1",
            duration: "15m",
            type: "practice",
            mcqs: 24,
            content:
              "Practice questions covering Sources of Pre History, Pre-Historic Society, and Prehistoric Art.",
            questions: [
              {
                id: 1,
                question: "Pre-history refers to the period before the invention of:",
                options: ["Agriculture", "Writing", "Metals", "Pottery"],
                correct: 1,
                explanation:
                  "Pre-history is defined as the period before the invention of writing systems. Written records mark the beginning of history.",
              },
              {
                id: 2,
                question: "Which of the following is NOT a source of pre-history?",
                options: ["Stone tools", "Cave paintings", "Written manuscripts", "Fossils"],
                correct: 2,
                explanation:
                  "Written manuscripts belong to the historical period. Pre-history relies on archaeological, geological, biological, and anthropological sources.",
              },
              {
                id: 3,
                question: "Bhimbetka, Hunsgi, and Mehrgarh are examples of:",
                options: ["Rivers", "Archaeological sites", "Mountains", "Ancient cities"],
                correct: 1,
                explanation:
                  "These are important archaeological sites in India that have provided crucial evidence about prehistoric life.",
              },
              {
                id: 4,
                question: "Radiocarbon dating is used to:",
                options: [
                  "Study pottery designs",
                  "Establish chronologies",
                  "Identify languages",
                  "Map trade routes",
                ],
                correct: 1,
                explanation:
                  "Radiocarbon dating and other scientific methods help establish the chronology of prehistoric sites and artifacts.",
              },
              {
                id: 5,
                question:
                  "Study of living tribal communities to understand prehistory is which type of source?",
                options: ["Archaeological", "Geological", "Biological", "Anthropological"],
                correct: 3,
                explanation:
                  "Anthropological sources include the study of living tribal communities whose lifestyle resembles prehistoric patterns.",
              },
              {
                id: 6,
                question: "Prehistoric communities were primarily:",
                options: [
                  "Agricultural",
                  "Nomadic hunter-gatherers",
                  "Urban dwellers",
                  "Sea traders",
                ],
                correct: 1,
                explanation:
                  "Prehistoric societies were nomadic hunter-gatherers who moved in search of food and water.",
              },
              {
                id: 7,
                question: "Social organization in prehistoric times was based on:",
                options: ["Wealth", "Kinship ties", "Written laws", "Military power"],
                correct: 1,
                explanation:
                  "Kinship ties formed the basis of social organization in prehistoric communities.",
              },
              {
                id: 8,
                question: "The discovery that transformed social dynamics was:",
                options: ["Agriculture", "Fire", "Metals", "Pottery"],
                correct: 1,
                explanation:
                  "The discovery of fire enabled cooking, warmth, and protection, fundamentally changing social dynamics.",
              },
              {
                id: 9,
                question: "Evidence of burial practices suggests:",
                options: [
                  "Trade networks",
                  "Beliefs about afterlife",
                  "Agricultural knowledge",
                  "Metal working",
                ],
                correct: 1,
                explanation:
                  "Burial practices with grave goods suggest that prehistoric people had beliefs about the afterlife.",
              },
              {
                id: 10,
                question: "The transition from food-gathering to food-producing marked:",
                options: [
                  "End of pre-history",
                  "Beginning of settled life",
                  "Invention of writing",
                  "Discovery of metals",
                ],
                correct: 1,
                explanation:
                  "The shift to food production (agriculture) marked the beginning of settled life and permanent communities.",
              },
              {
                id: 11,
                question: "Bhimbetka cave paintings are located in:",
                options: ["Rajasthan", "Madhya Pradesh", "Gujarat", "Maharashtra"],
                correct: 1,
                explanation:
                  "Bhimbetka is located in Madhya Pradesh and is a UNESCO World Heritage Site.",
              },
              {
                id: 12,
                question: "Bhimbetka paintings date back to approximately:",
                options: [
                  "10,000 years ago",
                  "20,000 years ago",
                  "30,000 years ago",
                  "50,000 years ago",
                ],
                correct: 2,
                explanation:
                  "The cave paintings at Bhimbetka date back to approximately 30,000 years ago.",
              },
              {
                id: 13,
                question: "Which color was NOT commonly used in prehistoric paintings?",
                options: ["Red ochre", "White chalk", "Blue pigment", "Green from plant extracts"],
                correct: 2,
                explanation:
                  "Blue pigment was not available. Artists used red ochre, white chalk, and green from plant extracts.",
              },
              {
                id: 14,
                question: "Paleolithic period art was characterized by:",
                options: [
                  "Complex narrative scenes",
                  "Agricultural themes",
                  "Simple geometric patterns",
                  "Portraits",
                ],
                correct: 2,
                explanation:
                  "Paleolithic art featured simple geometric patterns, which evolved into more complex scenes in later periods.",
              },
              {
                id: 15,
                question: "Mesolithic period rock art showed:",
                options: [
                  "Simple geometric patterns",
                  "More complex narrative scenes",
                  "Agricultural themes only",
                  "Abstract art",
                ],
                correct: 1,
                explanation:
                  "Mesolithic art evolved from simple geometric patterns to more complex narrative scenes depicting daily life.",
              },
              {
                id: 16,
                question: "Neolithic period art primarily featured:",
                options: [
                  "Hunting scenes",
                  "Geometric patterns",
                  "Agricultural themes",
                  "Marine life",
                ],
                correct: 2,
                explanation:
                  "Neolithic art evolved to show agricultural themes as communities transitioned to farming.",
              },
              {
                id: 17,
                question: "Division of labor in prehistoric society was primarily between:",
                options: [
                  "Rich and poor",
                  "Men and women",
                  "Elders and youth",
                  "Leaders and followers",
                ],
                correct: 1,
                explanation:
                  "Men primarily hunted while women gathered plant foods, roots, and fruits.",
              },
              {
                id: 18,
                question: "Fossils and skeletal remains are classified as:",
                options: [
                  "Archaeological sources",
                  "Geological sources",
                  "Biological sources",
                  "Anthropological sources",
                ],
                correct: 2,
                explanation:
                  "Fossils and skeletal remains are biological sources that help understand prehistoric life forms and human evolution.",
              },
              {
                id: 19,
                question: "Megalithic structures are associated with which type of source?",
                options: ["Geological", "Biological", "Archaeological", "Anthropological"],
                correct: 2,
                explanation:
                  "Megalithic structures (large stone structures) are archaeological sources that provide evidence of prehistoric burial practices and social organization.",
              },
              {
                id: 20,
                question: "Rock formations and soil layers are which type of prehistoric source?",
                options: ["Archaeological", "Geological", "Biological", "Anthropological"],
                correct: 1,
                explanation:
                  "Geological sources include rock formations and soil layers that provide context for prehistoric habitation and environmental conditions.",
              },
              {
                id: 21,
                question: "Prehistoric people primarily lived in:",
                options: ["Stone houses", "Caves and temporary shelters", "Mud villages", "Boats"],
                correct: 1,
                explanation:
                  "Prehistoric communities lived in caves or temporary shelters as they were nomadic.",
              },
              {
                id: 22,
                question: "Cave paintings indicate:",
                options: [
                  "Written language",
                  "Artistic expression and possibly religious rituals",
                  "Mathematical knowledge",
                  "Trade records",
                ],
                correct: 1,
                explanation:
                  "Cave paintings suggest artistic expression and possibly religious or ritualistic practices.",
              },
              {
                id: 23,
                question: "Which archaeological site is famous for prehistoric cave paintings?",
                options: ["Mohenjo-daro", "Bhimbetka", "Hunsgi", "Mehrgarh"],
                correct: 1,
                explanation:
                  "Bhimbetka in Madhya Pradesh is famous for its prehistoric cave paintings dating back 30,000 years.",
              },
              {
                id: 24,
                question: "The term 'pre-history' means:",
                options: ["Before humans", "Before writing", "Before agriculture", "Before cities"],
                correct: 1,
                explanation:
                  "Pre-history refers to the period before the invention of writing systems.",
              },
            ],
          },
          {
            id: 5,
            unitId: 1,
            title: "Palaeolithic Age",
            duration: "10m",
            type: "lesson",
            mcqs: 8,
            content:
              "The Palaeolithic Age (Old Stone Age) spans from approximately 2.5 million years ago to about 10,000 BCE. It is characterized by the use of rough, unpolished stone tools made by chipping and flaking.\n\nThe Palaeolithic period is divided into three phases: Lower Palaeolithic (hand axes, cleavers, choppers found at Sohan Valley, Belan Valley), Middle Palaeolithic (flake tools, scrapers, borers found at Nevasa, Bhimbetka), and Upper Palaeolithic (blades, burins, scrapers found at Belan Valley, Son Valley).\n\nPalaeolithic humans were hunters and food-gatherers. They lived in caves and rock shelters, used fire, and had no knowledge of agriculture, pottery, or metals. Climate during this period fluctuated between glacial and inter-glacial phases, significantly affecting human migration patterns.",
          },
          {
            id: 6,
            unitId: 1,
            title: "Mesolithic Age",
            duration: "10m",
            type: "lesson",
            mcqs: 8,
            content:
              "The Mesolithic Age (Middle Stone Age) dates from approximately 10,000 BCE to 8,000 BCE. This transitional period saw the development of microliths - tiny stone tools that were often hafted onto wooden or bone handles.\n\nImportant Mesolithic sites in India include Bagor (Rajasthan), Adamgarh (Madhya Pradesh), and Langhnaj (Gujarat). The climate became warmer, and humans began domesticating animals - the earliest evidence of dog domestication comes from this period.\n\nMesolithic communities showed evidence of both hunting-gathering and early food production. Burial sites from this period suggest increasingly complex social and religious practices. The rock paintings at Bhimbetka from the Mesolithic period show more sophisticated artistic techniques.",
          },
          {
            id: 7,
            unitId: 1,
            title: "Neolithic Age",
            duration: "8m",
            type: "lesson",
            mcqs: 8,
            content:
              "The Neolithic Age (New Stone Age) began around 8,000 BCE and is characterized by polished stone tools, the development of agriculture, and the establishment of permanent settlements.\n\nKey Neolithic sites in India include Burzahom and Gufkral (Kashmir), Chirand (Bihar), Koldihwa and Mahagara (UP), and Piklihal and Hallur (Karnataka). The people of Burzahom lived in pit dwellings and used bone tools alongside polished stone implements.\n\nThe Neolithic Revolution - the transition from hunting-gathering to agriculture - was one of the most significant transformations in human history. People began cultivating wheat, barley, rice, and ragi. Pottery making began, and communities settled near river valleys. Domestication of cattle, sheep, and goats provided a stable food supply.",
          },
          {
            id: 8,
            unitId: 1,
            title: "Chalcolithic Age",
            duration: "7m",
            type: "lesson",
            mcqs: 8,
            content:
              "The Chalcolithic Age (Copper-Stone Age) marks the transition between the Stone Age and the Bronze Age, approximately 3000-1500 BCE. People began using copper alongside stone tools.\n\nMajor Chalcolithic cultures in India include: Ahar-Banas culture (Rajasthan), Kayatha culture (Madhya Pradesh), Malwa culture, Jorwe culture (Maharashtra), and Prabhas and Ranger cultures (Gujarat).\n\nChalcolithic communities practiced agriculture and animal husbandry. They lived in rectangular and circular houses made of mud, wattle, and daub. Black-and-red ware pottery is a distinctive feature of this period. Evidence suggests trade networks existed between different Chalcolithic communities. Burial practices included burying the dead within the habitation area, often with pottery and personal ornaments.",
          },
          {
            id: 9,
            unitId: 1,
            title: "Practice Sheet 2",
            duration: "15m",
            type: "practice",
            mcqs: 24,
            content:
              "Practice questions covering Palaeolithic Age, Mesolithic Age, Neolithic Age, and Chalcolithic Age.",
            questions: [
              {
                id: 1,
                question: "The Palaeolithic Age is also known as:",
                options: ["New Stone Age", "Middle Stone Age", "Old Stone Age", "Copper-Stone Age"],
                correct: 2,
                explanation:
                  "Palaeolithic means 'Old Stone Age' - the earliest period of human prehistory.",
              },
              {
                id: 2,
                question: "Palaeolithic tools were made by:",
                options: ["Polishing", "Chipping and flaking", "Casting", "Welding"],
                correct: 1,
                explanation:
                  "Palaeolithic tools were made by chipping and flaking stones to create rough, unpolished implements.",
              },
              {
                id: 3,
                question: "Hand axes and cleavers are associated with:",
                options: [
                  "Lower Palaeolithic",
                  "Middle Palaeolithic",
                  "Upper Palaeolithic",
                  "Mesolithic",
                ],
                correct: 0,
                explanation:
                  "Hand axes, cleavers, and choppers are characteristic of the Lower Palaeolithic phase.",
              },
              {
                id: 4,
                question: "Blades and burins are associated with:",
                options: [
                  "Lower Palaeolithic",
                  "Middle Palaeolithic",
                  "Upper Palaeolithic",
                  "Neolithic",
                ],
                correct: 2,
                explanation:
                  "Blades and burins are characteristic tools of the Upper Palaeolithic phase.",
              },
              {
                id: 5,
                question: "Palaeolithic humans had knowledge of:",
                options: ["Agriculture", "Pottery", "Fire", "Metals"],
                correct: 2,
                explanation:
                  "Palaeolithic humans used fire but had no knowledge of agriculture, pottery, or metals.",
              },
              {
                id: 6,
                question: "Sohan Valley is associated with which phase?",
                options: [
                  "Lower Palaeolithic",
                  "Middle Palaeolithic",
                  "Upper Palaeolithic",
                  "Mesolithic",
                ],
                correct: 0,
                explanation:
                  "Sohan Valley (now in Pakistan) is an important Lower Palaeolithic site with hand axes and choppers.",
              },
              {
                id: 7,
                question: "The Mesolithic Age is also known as:",
                options: ["Old Stone Age", "Middle Stone Age", "New Stone Age", "Copper Age"],
                correct: 1,
                explanation:
                  "Mesolithic means 'Middle Stone Age', a transitional period between Palaeolithic and Neolithic.",
              },
              {
                id: 8,
                question: "Microliths are:",
                options: ["Large stone tools", "Tiny stone tools", "Metal tools", "Bone tools"],
                correct: 1,
                explanation:
                  "Microliths are tiny stone tools that were often hafted onto wooden or bone handles.",
              },
              {
                id: 9,
                question: "Bagor is an important Mesolithic site in:",
                options: ["Madhya Pradesh", "Gujarat", "Rajasthan", "Bihar"],
                correct: 2,
                explanation:
                  "Bagor on the Kothari river in Rajasthan is one of the largest Mesolithic sites in India.",
              },
              {
                id: 10,
                question: "The earliest evidence of dog domestication comes from:",
                options: ["Palaeolithic", "Mesolithic", "Neolithic", "Chalcolithic"],
                correct: 1,
                explanation:
                  "The earliest evidence of dog domestication dates to the Mesolithic period.",
              },
              {
                id: 11,
                question: "During the Mesolithic, the climate became:",
                options: ["Colder", "Warmer", "Drier", "More unpredictable"],
                correct: 1,
                explanation:
                  "The climate became warmer during the Mesolithic, ending the last glacial period.",
              },
              {
                id: 12,
                question: "Adamgarh is located in:",
                options: ["Rajasthan", "Madhya Pradesh", "Gujarat", "Karnataka"],
                correct: 1,
                explanation:
                  "Adamgarh in Madhya Pradesh is an important Mesolithic site with evidence of animal domestication.",
              },
              {
                id: 13,
                question: "The Neolithic Age is characterized by:",
                options: [
                  "Rough stone tools",
                  "Polished stone tools and agriculture",
                  "Use of copper",
                  "Iron tools",
                ],
                correct: 1,
                explanation:
                  "The Neolithic Age featured polished stone tools, agriculture, and permanent settlements.",
              },
              {
                id: 14,
                question: "Burzahom is located in:",
                options: ["Bihar", "Kashmir", "Karnataka", "Uttar Pradesh"],
                correct: 1,
                explanation:
                  "Burzahom is an important Neolithic site in Kashmir known for pit dwellings and bone tools.",
              },
              {
                id: 15,
                question: "People of Burzahom lived in:",
                options: ["Caves", "Pit dwellings", "Wooden houses", "Stone castles"],
                correct: 1,
                explanation:
                  "The people of Burzahom lived in pit dwellings - underground or semi-underground structures.",
              },
              {
                id: 16,
                question: "The Neolithic Revolution refers to:",
                options: [
                  "Discovery of fire",
                  "Transition from hunting-gathering to agriculture",
                  "Invention of writing",
                  "Use of metals",
                ],
                correct: 1,
                explanation:
                  "The Neolithic Revolution was the fundamental shift from food-gathering to food-producing.",
              },
              {
                id: 17,
                question: "Which crop was NOT cultivated during the Neolithic?",
                options: ["Wheat", "Rice", "Cotton", "Barley"],
                correct: 2,
                explanation:
                  "Wheat, barley, rice, and ragi were cultivated. Cotton cultivation came much later.",
              },
              {
                id: 18,
                question: "Chirand is a Neolithic site in:",
                options: ["Kashmir", "Bihar", "Karnataka", "Madhya Pradesh"],
                correct: 1,
                explanation:
                  "Chirand in Bihar is an important Neolithic site with evidence of early agriculture.",
              },
              {
                id: 19,
                question: "The Chalcolithic Age is also known as:",
                options: ["Iron Age", "Copper-Stone Age", "Bronze Age", "Gold Age"],
                correct: 1,
                explanation:
                  "Chalcolithic means 'Copper-Stone Age', marking the use of copper alongside stone tools.",
              },
              {
                id: 20,
                question: "Ahar-Banas culture is associated with:",
                options: ["Madhya Pradesh", "Maharashtra", "Rajasthan", "Gujarat"],
                correct: 2,
                explanation:
                  "Ahar-Banas culture is a major Chalcolithic culture found in Rajasthan.",
              },
              {
                id: 21,
                question: "Black-and-red ware pottery is distinctive of:",
                options: ["Palaeolithic", "Mesolithic", "Neolithic", "Chalcolithic"],
                correct: 3,
                explanation:
                  "Black-and-red ware pottery is a distinctive feature of Chalcolithic cultures in India.",
              },
              {
                id: 22,
                question: "Jorwe culture is found in:",
                options: ["Rajasthan", "Madhya Pradesh", "Maharashtra", "Gujarat"],
                correct: 2,
                explanation: "Jorwe culture is an important Chalcolithic culture of Maharashtra.",
              },
              {
                id: 23,
                question: "Chalcolithic people lived in houses made of:",
                options: ["Stone", "Mud, wattle, and daub", "Bricks", "Wood only"],
                correct: 1,
                explanation:
                  "Chalcolithic people lived in rectangular and circular houses made of mud, wattle, and daub.",
              },
              {
                id: 24,
                question: "The Chalcolithic Age dates approximately from:",
                options: ["5000-3000 BCE", "3000-1500 BCE", "1500-1000 BCE", "1000-500 BCE"],
                correct: 1,
                explanation: "The Chalcolithic Age in India spans approximately 3000-1500 BCE.",
              },
            ],
          },
        ],
      },
    ],
  },
};
