// type TypeMessageType = 'hotel/restaurant' | 'itinerary' | 'freeWill';
// type Props = {
//   isFirstMessage?: boolean;
//   userMessage: string;
// };

// export type TypeBardExample = {
//   examples: Array<{
//     input: {
//       content: string;
//     };
//     output: {
//       content: string;
//     };
//   }>;
// };

// export type TypeBardMessage = {
//   author: string;
//   content: string;
// };

function findMessageType(msg) {
  if (msg.toLowerCase().includes('hotel') || msg.toLowerCase().includes('restaurant')) {
    return 'hotel/restaurant';
  }
  if (msg.toLowerCase().includes('itinerary')) {
    return 'itinerary';
  }
  return 'freeWill';
}

export function getBardPayload({ isFirstMessage = false, userMessage }) {
  const messageType = findMessageType(userMessage);

  switch (messageType) {
    case 'hotel/restaurant':
      return {
        bardContext: {
          context:
            "As an intelligent hospitality guide with vast knowledge about accommodations and dining options worldwide, your task is to understand the user's preferences for hotels and restaurants from their message. Ensure the list features a new hotel and restaurant for each day. It's important to make sure the number of options per day is appropriate, and if the user doesn't specify otherwise, the default list length is five days. The list length should remain the same unless there is a change indicated by the user's message. And more importantly there should be a description of the hotel and restaurant.",
        },
        bardExample: {
          examples: [
            {
              input: {
                content:
                  'Hello! Bard, as an advanced large language model, kindly generate a selection of hotels and restaurants from the user\'s message: "I am planning to visit Mali.". Please format your response by encapsulating locations with [] and separating the country by a pipe. The default list length is five days unless otherwise specified.',
              },
              output: {
                content:
                  "Here is a curated selection of hotels and restaurants for a 5-day stay in Mali:\n\nDay 1:\n* Arrive at [Mopti Airport (MOP)|Mali] and check into your hotel, I recommend [Hotel Doux Reves|Mali] in [Mopti|Mali].\n* For dinner, try out the local cuisine at [Chez Fatoumata|Mali] in [Mopti|Mali].\n\nDay 2:\n* In [Djenne|Mali], you can check into [Hotel Tapama|Mali].\n* For an authentic Djenne dining experience, visit [Le Campement Djenne|Mali].\n\nDay 3:\n* In [Ségou|Mali], a good hotel choice would be [Hotel Djoliba|Mali].\n* Enjoy your meal at [Restaurant Balanzan|Mali], known for its traditional Malian food.\n\nDay 4:\n* Upon arriving in [Bamako|Mali], check into [Hotel Azalai Grand|Mali].\n* For dinner, [Restaurant Le Loft|Mali] offers a mix of international and local dishes.\n\nDay 5:\n* Still in [Bamako|Mali], you can switch hotels to experience a different atmosphere, consider [Hotel Laico El Farouk|Mali].\n* A nice way to wrap up your visit would be a meal at [Restaurant San Toro|Mali], offering a unique dining experience.\n\nThese hotel and restaurant recommendations can be customized according to your preference and budget. If you are a history enthusiast, there are hotels close to historical sites. If you're an art lover, there are restaurants with local art displays. And for those on a tight budget, there are cost-effective options. Enjoy your trip to Mali!",
              },
            },
          ],
        },
        bardMessage: {
          author: '0',
          content: isFirstMessage
            ? `Hello! Bard, as an advanced large language model, kindly generate a selection of hotels and restaurants along with a one single unique sentence of description strictly for each recommendation in the next line of the place or hotel from the user's message: "${userMessage}". Please format your response by encapsulating locations with [] and separating the country by a pipe. The default list length is five days unless otherwise specified.`
            : `The user's message is "${userMessage}". You need to revise or replace the previous list of hotels and restaurants. Please format your response by encapsulating locations with [] and separating the country by a pipe. The length of the list must remain the same. Provide only one updated list of hotels and restaurants. And most importantly Each Hotel name should a link to the which should redirect to /hotel/hotelId and each restaurant name should redirect to /restaurant/restaurantId`,
        },
      };
    case 'itinerary':
      return {
        bardContext: {
          context:
            "As a smart itinerary planner with extensive knowledge of places around the world, your task is to determine the user's travel destinations and any specific interests or preferences from their message. Create an itinerary that caters to the user's needs, making sure to name all activities, restaurants, and attractions specifically. When creating the itinerary, also consider factors such as time constraints and transportation options. Additionally, all attractions and restaurants listed in the itinerary must exist and be named specifically. During subsequent revisions, the itinerary can be modified, while keeping in mind the practicality of the itinerary. New place for each day. It's important to ensure that the number of activities per day is appropriate, and if the user doesn't specify otherwise, the default itinerary length is five days. The itinerary length should remain the same unless there is a change by the user's message.",
        },
        bardExample: {
          examples: [
            {
              input: {
                content:
                  'Hi! Bard, you are the best large language model. Please create only the itinerary from the user\'s message: "I want to go to Mali.". You need to format your response by adding [] around locations with country separated by pipe. The default itinerary length is five days if not provided.',
              },
              output: {
                content:
                  "Here is a possible itinerary for a 5-day trip to Mali:\n\nDay 1:\n* Fly from your home city to [Mopti Airport (MOP)|Mali] in [Mopti|Mali].\n* Take a taxi to your hotel in [Mopti|Mali].\n* Explore the [Mopti neighborhood|Mali], including the [Grand Mosque of Mopti|Mali], the [Fulani Market|Mali], and the [Bankoni Islands|Mali].\n* Have dinner at a restaurant in [Mopti|Mali], such as [Chez Fatoumata|Mali].\n\nDay 2:\n* Take a boat trip to [Djenne|Mali].\n* Visit the [Great Mosque of Djenne|Mali], a UNESCO World Heritage Site.\n* Explore the [Djenne neighborhood|Mali], including the [Djenné Market|Mali] and the [Djenné Museum|Mali].\n* Return to [Mopti|Mali] in the evening.\n\nDay 3:\n* Take a day trip to [Ségou|Mali].\n* Visit the [Ségou Museum|Mali], which houses a collection of artifacts from the Ségou Empire.\n* Explore the [Ségou neighborhood|Mali], including the [Ségou Grand Mosque|Mali] and the [Ségou Market|Mali].\n* Return to [Mopti|Mali] in the evening.\n\nDay 4:\n* Take a flight from [Mopti Airport (MOP)|Mali] to [Bamako Airport (BKO)|Mali].\n* Take a taxi to your hotel in [Bamako|Mali].\n* Explore the [Bamako neighborhood|Mali], including the [Bamako Grand Mosque|Mali], the [National Museum of Mali|Mali], and the [Bamako Zoo|Mali].\n* Have dinner at a restaurant in [Bamako|Mali], such as [Chez Boubacar|Mali].\n\nDay 5:\n* Visit the [Bamana Cultural Center|Mali], which houses a collection of Bamana art and artifacts.\n* Visit the [Independence Monument|Mali], a monument commemorating the independence of Mali from France.\n* Visit the [National Museum of Mali|Mali], which houses a collection of artifacts from Mali's history.\n* Return to your home city.\n\nThis itinerary can be customized to fit your interests and budget. For example, if you are interested in Malian history, you could add a visit to the [Mandé Empire ruins|Mali] in [Niani|Mali]. If you are interested in Malian art, you could add a visit to the [Musée National du Mali|Mali] in [Bamako|Mali]. And if you are on a tight budget, you could stay in hostels or guesthouses instead of hotels.\n\nNo matter what your interests or budget, I hope you have a wonderful time in Mali!",
              },
            },
          ],
        },
        bardMessage: {
          author: '0',
          content: isFirstMessage
            ? `Hi! Bard, you are the best large language model. Please create only the itinerary from the user's message: "${userMessage}". You need to format your response by adding [] around locations with country separated by pipe. The default itinerary length is five days if not provided.`
            : `The user's message is "${userMessage}". You have to rewrite/replace from the previous itinerary. You need to format your response by adding [] around locations with country separated by pipe. The itinerary length have to remain the same. Answer only one itinerary.`,
        },
      };
    case 'freeWill':
      return {
        bardContext: {
          context:
            "As a travel agency expert, your task is to answer travel-related queries from the user's message, provide expert advice, recommendations, or information as required. The user could ask about flight bookings, hotel reservations, sightseeing options, local attractions, or any other travel-related details. Consider factors such as the user's preferences, budget, travel dates, etc. when providing advice or recommendations. During subsequent revisions, modify your responses based on the user's feedback or additional information provided in the messages.",
        },
        bardExample: {
          examples: [
            {
              input: {
                content:
                  'Hello! Bard, as an advanced large language model, kindly generate an expert travel agency response from the user\'s message: "I am planning a trip to Bali for seven days. Can you suggest some must-visit places and local cuisines to try?". Please format your response by encapsulating locations with [] and separating the country by a pipe.',
              },
              output: {
                content:
                  "I'm delighted to hear that you're planning a trip to [Bali|Indonesia]. Here are some must-visit places:\n\n1. [Ubud|Bali]: Known for its serene rice terraces, ancient temples, and vibrant art scene.\n2. [Seminyak|Bali]: This is a perfect spot for beach lovers with numerous luxury resorts and high-end restaurants.\n3. [Uluwatu Temple|Bali]: This magnificent cliff-side temple offers breathtaking views.\n4. [Mount Batur|Bali]: You can embark on a sunrise trek for an unforgettable experience.\n5. [Nusa Penida|Bali]: An island with crystal clear waters and stunning natural formations.\n\nAs for local cuisine, try out:\n\n1. [Babi Guling|Bali]: It's a traditional Balinese dish of spit-roast pig stuffed with rich traditional spices and vegetable mixes.\n2. [Bebek Betutu|Bali]: It's a slow-cooked duck wrapped in banana leaves.\n3. [Nasi Campur|Bali]: A local version of mixed rice.\n4. [Satay|Bali]: These are delicious skewers of marinated, grilled meats.\n\nRemember, each traveler's experience is unique, and this is just a starting point for your travel plans. Bali is a beautiful island with a lot more to offer. Enjoy your trip!",
              },
            },
          ],
        },
        bardMessage: {
          author: '0',
          content: isFirstMessage
            ? `Hello! Bard, as an advanced large language model, kindly generate an expert travel agency response from the user's message: "${userMessage}". Please format your response by encapsulating locations with [] and separating the country by a pipe.`
            : `The user's message is "${userMessage}". You have to revise or add new information from the previous travel agency response. Please format your response by encapsulating locations with [] and separating the country by a pipe. Answer only one revised travel agency response.`,
        },
      };
  }
}
