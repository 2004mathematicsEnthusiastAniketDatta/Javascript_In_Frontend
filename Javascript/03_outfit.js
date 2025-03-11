/**
 * Weather Outfit Recommendation System
 * This application provides outfit recommendations based on weather conditions.
 * Implemented using SOLID principles and object-oriented design patterns.
 */

// Weather types enumeration
const WeatherType = {
    SUNNY: 'sunny',
    RAINY: 'rainy',
    CLOUDY: 'cloudy',
    SNOWY: 'snowy',
    WINDY: 'windy',
    STORMY: 'stormy',
    UNKNOWN: 'unknown'
  };
  
  /**
   * Strategy Pattern: Outfit recommendation strategies for different weather types
   */
  class OutfitRecommendationStrategy {
    getRecommendation() {
      throw new Error('Method not implemented');
    }
  }
  
  class SunnyWeatherStrategy extends OutfitRecommendationStrategy {
    getRecommendation() {
      return {
        headwear: 'hat and sunglasses',
        topwear: 'light t-shirt',
        bottomwear: 'shorts or light pants',
        footwear: 'sandals or sneakers',
        accessories: 'sunscreen, water bottle',
        message: 'Wear a hat and sunglasses, light clothing, and apply sunscreen to protect from UV rays.'
      };
    }
  }
  
  class RainyWeatherStrategy extends OutfitRecommendationStrategy {
    getRecommendation() {
      return {
        headwear: 'rain hat or hood',
        topwear: 'waterproof jacket',
        bottomwear: 'water-resistant pants',
        footwear: 'rain boots',
        accessories: 'umbrella',
        message: 'Bring an umbrella and wear boots with waterproof clothing.'
      };
    }
  }
  
  class CloudyWeatherStrategy extends OutfitRecommendationStrategy {
    getRecommendation() {
      return {
        headwear: 'none or light cap',
        topwear: 'light jacket or sweater',
        bottomwear: 'jeans or casual pants',
        footwear: 'sneakers or casual shoes',
        accessories: 'none',
        message: 'Wear a light jacket and comfortable clothing as temperature may vary.'
      };
    }
  }
  
  class SnowyWeatherStrategy extends OutfitRecommendationStrategy {
    getRecommendation() {
      return {
        headwear: 'beanie or winter hat',
        topwear: 'heavy winter coat',
        bottomwear: 'thermal pants',
        footwear: 'insulated snow boots',
        accessories: 'gloves, scarf',
        message: 'Bundle up with warm layers, insulated boots, and don\'t forget gloves and a hat.'
      };
    }
  }
  
  class WindyWeatherStrategy extends OutfitRecommendationStrategy {
    getRecommendation() {
      return {
        headwear: 'secure hat or cap',
        topwear: 'windbreaker jacket',
        bottomwear: 'fitted pants',
        footwear: 'closed shoes',
        accessories: 'none',
        message: 'Wear windproof clothing and avoid loose items that may blow away.'
      };
    }
  }
  
  class DefaultWeatherStrategy extends OutfitRecommendationStrategy {
    getRecommendation() {
      return {
        headwear: 'optional',
        topwear: 'comfortable shirt',
        bottomwear: 'comfortable pants',
        footwear: 'comfortable shoes',
        accessories: 'none',
        message: 'Wear what you have on - dress comfortably for the day.'
      };
    }
  }
  
  /**
   * Factory for creating appropriate weather strategy
   */
  class WeatherStrategyFactory {
    static createStrategy(weatherType) {
      switch (weatherType.toLowerCase()) {
        case WeatherType.SUNNY:
          return new SunnyWeatherStrategy();
        case WeatherType.RAINY:
          return new RainyWeatherStrategy();
        case WeatherType.CLOUDY:
          return new CloudyWeatherStrategy();
        case WeatherType.SNOWY:
          return new SnowyWeatherStrategy();
        case WeatherType.WINDY:
          return new WindyWeatherStrategy();
        default:
          return new DefaultWeatherStrategy();
      }
    }
  }
  
  /**
   * Weather Service for fetching current weather data
   */
  class WeatherService {
    constructor(apiKey = null) {
      this.apiKey = apiKey;
    }
  
    /**
     * Gets the current weather for a location
     * @param {string} location - The location to get weather for
     * @returns {Promise<string>} A promise that resolves to the weather type
     */
    async getCurrentWeather(location) {
      try {
        if (this.apiKey) {
          // In a real app, this would make an actual API call
          // return await fetch(`https://api.weatherservice.com/current?location=${encodeURIComponent(location)}&apiKey=${this.apiKey}`)
          //   .then(response => response.json())
          //   .then(data => data.weatherType);
        }
        
        // For demonstration, return a mock result
        // In a real application, this would come from the API
        const mockWeatherTypes = [
          WeatherType.SUNNY,
          WeatherType.RAINY,
          WeatherType.CLOUDY,
          WeatherType.SNOWY,
          WeatherType.WINDY
        ];
        return Promise.resolve(mockWeatherTypes[Math.floor(Math.random() * mockWeatherTypes.length)]);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        return Promise.resolve(WeatherType.UNKNOWN);
      }
    }
  }
  
  /**
   * Outfit Recommender class - Core application functionality
   */
  class OutfitRecommender {
    constructor(weatherService) {
      this.weatherService = weatherService;
    }
  
    /**
     * Gets outfit recommendations for the given location
     * @param {string} location - The location to get recommendations for
     * @returns {Promise<object>} The outfit recommendations
     */
    async getRecommendationForLocation(location) {
      try {
        const weatherType = await this.weatherService.getCurrentWeather(location);
        return this.getRecommendationForWeather(weatherType);
      } catch (error) {
        console.error('Error getting recommendation:', error);
        return new DefaultWeatherStrategy().getRecommendation();
      }
    }
  
    /**
     * Gets outfit recommendations for the given weather type
     * @param {string} weatherType - The weather type
     * @returns {object} The outfit recommendations
     */
    getRecommendationForWeather(weatherType) {
      const strategy = WeatherStrategyFactory.createStrategy(weatherType);
      const recommendation = strategy.getRecommendation();
      recommendation.weatherType = weatherType;
      return recommendation;
    }
  }
  
  /**
   * User Interface for the application
   */
  class OutfitRecommendationUI {
    constructor(recommender) {
      this.recommender = recommender;
    }
  
    /**
     * Displays outfit recommendation in the console
     * @param {object} recommendation - The recommendation to display
     */
    displayRecommendation(recommendation) {
      console.log(`\n=== OUTFIT RECOMMENDATION FOR ${recommendation.weatherType.toUpperCase()} WEATHER ===`);
      console.log(`Headwear: ${recommendation.headwear}`);
      console.log(`Top: ${recommendation.topwear}`);
      console.log(`Bottom: ${recommendation.bottomwear}`);
      console.log(`Footwear: ${recommendation.footwear}`);
      console.log(`Accessories: ${recommendation.accessories}`);
      console.log(`\nSuggestion: ${recommendation.message}\n`);
    }
  
    /**
     * Gets and displays recommendation for a location
     * @param {string} location - The location to get recommendation for
     */
    async showRecommendationForLocation(location) {
      try {
        console.log(`Fetching weather data for ${location}...`);
        const recommendation = await this.recommender.getRecommendationForLocation(location);
        this.displayRecommendation(recommendation);
      } catch (error) {
        console.error('Failed to show recommendation:', error);
      }
    }
  
    /**
     * Shows recommendation for a specific weather type
     * @param {string} weatherType - The weather type
     */
    showRecommendationForWeather(weatherType) {
      try {
        console.log(`Getting outfit recommendation for ${weatherType} weather...`);
        const recommendation = this.recommender.getRecommendationForWeather(weatherType);
        this.displayRecommendation(recommendation);
      } catch (error) {
        console.error('Failed to show recommendation:', error);
      }
    }
  }
  
  // Application startup and usage
  (async function main() {
    // Initialize services and components
    const weatherService = new WeatherService('your-api-key-here');
    const outfitRecommender = new OutfitRecommender(weatherService);
    const ui = new OutfitRecommendationUI(outfitRecommender);
    
    // Example of using specific weather
    // Similar to the original code but using the OOP structure
    const currentWeather = "sunny"; // This could come from user input or API
    ui.showRecommendationForWeather(currentWeather);
    
    // Example of location-based recommendation (async)
    await ui.showRecommendationForLocation("New York");
  })();