document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');

    // Main panels
    const weatherContent = document.getElementById('weather-content');
    const detailsContent = document.getElementById('details-content');
    const loading = document.getElementById('loading');
    const errorMessage = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');

    // UI Elements
    const elCity = document.getElementById('city-name');
    const elCountry = document.getElementById('country-name');
    const elTemp = document.getElementById('temperature');
    const elCondition = document.getElementById('weather-condition');
    const elIcon = document.getElementById('weather-icon');

    // Detail Elements
    const elFeels = document.getElementById('feels-like');
    const elHumid = document.getElementById('humidity');
    const elWind = document.getElementById('wind-speed');
    const elPress = document.getElementById('pressure');

    const forecastContainer = document.getElementById('forecast-cards');
    const bgGradient = document.querySelector('.bg-gradient');

    // Startup search
    fetchWeather('New York');

    searchBtn.addEventListener('click', () => {
        const city = searchInput.value.trim();
        if (city) fetchWeather(city);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const city = searchInput.value.trim();
            if (city) {
                searchInput.blur();
                fetchWeather(city);
            }
        }
    });

    async function fetchWeather(city) {
        weatherContent.classList.add('hidden');
        detailsContent.classList.add('hidden');
        errorMessage.classList.add('hidden');
        loading.classList.remove('hidden');

        try {
            const response = await fetch(`/weather/forecast?city=${encodeURIComponent(city)}&days=3`);

            if (!response.ok) throw new Error('City not found');

            const data = await response.json();
            updateUI(data);

        } catch (error) {
            console.error('Error fetching weather:', error);
            errorText.textContent = error.message === 'City not found'
                ? `Couldn't locate "${city}". Please try a different location.`
                : 'Service unavailable. Please try again later.';

            loading.classList.add('hidden');
            errorMessage.classList.remove('hidden');
        }
    }

    function updateUI(data) {
        const current = data.weatherResponse;
        const forecast = data.dayTemp;

        // Populate Main Left Panel
        elCity.textContent = current.city || current.region;
        elCountry.textContent = current.country;
        elTemp.textContent = Math.round(parseFloat(current.temperature));
        elCondition.textContent = current.condition;

        const iconClass = getIconBasedOnCondition(current.condition.toLowerCase(), true);
        elIcon.className = `fa-solid ${iconClass} float-icon`;

        // Populate Right Panel Grid
        elFeels.textContent = `${Math.round(parseFloat(current.feelsLike))}°C`;
        elHumid.textContent = `${current.humidity}%`;
        elWind.textContent = `${current.windSpeed} km/h`;
        elPress.textContent = `${Math.round(parseFloat(current.pressure))} hPa`;

        // Update Dynamic Background
        updateDynamicBackground(current.condition.toLowerCase(), current.temperature, current.windSpeed);

        // Update Forecast List
        forecastContainer.innerHTML = '';
        if (forecast && forecast.length > 0) {
            forecast.forEach((day, index) => {
                const dateObj = new Date(day.date);
                // "Today", "Tomorrow" logic
                let dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
                if (index === 0) dayName = 'Today';
                if (index === 1) dayName = 'Tomorrow';

                const condIcon = day.maxTemp > 24 ? 'fa-sun' : (day.maxTemp < 10 ? 'fa-snowflake' : 'fa-cloud');

                const row = document.createElement('div');
                row.className = 'forecast-row';
                row.innerHTML = `
                    <div class="f-day">${dayName}</div>
                    <div class="f-icon-wrap"><i class="fa-solid ${condIcon}"></i></div>
                    <div class="f-temp-wrap">
                        <span class="f-max">${Math.round(day.maxTemp)}°</span>
                        <span class="f-min">${Math.round(day.minTemp)}°</span>
                    </div>
                `;
                forecastContainer.appendChild(row);
            });
        }

        loading.classList.add('hidden');
        weatherContent.classList.remove('hidden');
        detailsContent.classList.remove('hidden');
    }

    function getIconBasedOnCondition(condition, isMain) {
        if (condition.includes('clear') || condition.includes('sunny')) return 'fa-sun';
        if (condition.includes('cloud') || condition.includes('overcast')) return 'fa-cloud';
        if (condition.includes('rain') || condition.includes('drizzle')) return 'fa-cloud-showers-heavy';
        if (condition.includes('snow')) return 'fa-snowflake';
        if (condition.includes('thunder') || condition.includes('storm')) return 'fa-bolt-lightning';
        if (condition.includes('fog') || condition.includes('mist')) return 'fa-smog';
        return 'fa-cloud-sun';
    }

    function updateDynamicBackground(condition, tempStr, windStr) {
        const temp = parseFloat(tempStr);
        let gradient = '';

        if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('thunder')) {
            gradient = 'linear-gradient(135deg, #2b3240, #141e30)'; // Dark stormy
        } else if (condition.includes('snow')) {
            gradient = 'linear-gradient(135deg, #74ebd5, #9face6)'; // Cold pastel
        } else if (condition.includes('cloud') || condition.includes('overcast')) {
            gradient = 'linear-gradient(135deg, #4b6cb7, #182848)'; // Deep blue
        } else {
            if (temp > 28) {
                gradient = 'linear-gradient(150deg, #f12711, #f5af19)'; // Hot orange
            } else if (temp < 10) {
                gradient = 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)'; // Icy deep
            } else {
                gradient = 'linear-gradient(135deg, #1fa2ff, #12d8fa, #a6ffcb)'; // Pleasant clear
            }
        }

        bgGradient.style.background = gradient;
        bgGradient.style.backgroundSize = '300% 300%';

        // Adaptive UI text depending on background brightness handling
        if (condition.includes('snow') || gradient.includes('#12d8fa')) {
            document.documentElement.style.setProperty('--text-primary', '#111827');
            document.documentElement.style.setProperty('--text-secondary', 'rgba(17, 24, 39, 0.7)');
            document.documentElement.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.2)');
            document.documentElement.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.4)');
            document.documentElement.style.setProperty('--glass-highlight', 'rgba(255, 255, 255, 0.35)');
        } else {
            document.documentElement.style.setProperty('--text-primary', '#ffffff');
            document.documentElement.style.setProperty('--text-secondary', 'rgba(255, 255, 255, 0.7)');
            document.documentElement.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.1)');
            document.documentElement.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.15)');
            document.documentElement.style.setProperty('--glass-highlight', 'rgba(255, 255, 255, 0.2)');
        }
    }
});
