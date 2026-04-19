import { connection } from "next/server";
import { fetchWeatherApi } from "openmeteo";

const LONDON_COORDS = {
  latitude: 51.5072,
  longitude: -0.1276,
} as const;

function getWeatherDescription(code: number | undefined) {
  switch (code) {
    case 0:
      return "clear skies";
    case 1:
      return "mostly clear skies";
    case 2:
      return "partly cloudy skies";
    case 3:
      return "overcast skies";
    case 45:
    case 48:
      return "foggy conditions";
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return "drizzly weather";
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return "rain";
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return "snow";
    case 95:
    case 96:
    case 99:
      return "thunderstorms";
    default:
      return "typical London weather";
  }
}

async function getLondonWeather() {
  await connection();

  const params = {
    latitude: [LONDON_COORDS.latitude],
    longitude: [LONDON_COORDS.longitude],
    current: "temperature_2m,weather_code",
    timezone: "Europe/London",
    forecast_days: 1,
  };

  try {
    const responses = await fetchWeatherApi(
      "https://api.open-meteo.com/v1/forecast",
      params,
    );
    const response = responses[0];
    const current = response?.current();

    if (!current) return null;

    const temperature = current.variables(0)?.value();
    const weatherCode = current.variables(1)?.value();

    if (typeof temperature !== "number" || Number.isNaN(temperature)) {
      return null;
    }

    return {
      temperature: Math.round(temperature),
      weatherCode: typeof weatherCode === "number" ? Math.round(weatherCode) : undefined,
      description: getWeatherDescription(
        typeof weatherCode === "number" ? weatherCode : undefined,
      ),
    };
  } catch {
    return null;
  }
}

function WeatherIcon({ code }: { code: number | undefined }) {
  const svgProps = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (code === 0 || code === 1) {
    return (
      <svg {...svgProps}>
        <circle cx="12" cy="12" r="4.5"/>
        <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M5.64 5.64l1.77 1.77M16.59 16.59l1.77 1.77M18.36 5.64l-1.77 1.77M7.41 16.59l-1.77 1.77"/>
      </svg>
    );
  }
  if (code === 2) {
    return (
      <svg {...svgProps}>
        <path d="M10 3v1m4.24 1.76-.7.7M17 9h-1m-2.3 5.3.7.7"/>
        <circle cx="10" cy="7" r="3"/>
        <path d="M19 17H5a4 4 0 0 1-.67-7.94A5 5 0 0 1 14 10.3a3.5 3.5 0 0 1 5 3.2 2.5 2.5 0 0 1 0 3.5z"/>
      </svg>
    );
  }
  if (code === 3) {
    return (
      <svg {...svgProps}>
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/>
      </svg>
    );
  }
  if (code === 45 || code === 48) {
    return (
      <svg {...svgProps}>
        <path d="M3 8h18M3 12h18M3 16h18M5 20h14"/>
      </svg>
    );
  }
  if (code !== undefined && code >= 51 && code <= 57) {
    return (
      <svg {...svgProps}>
        <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/>
        <path d="M8 19v.01M12 19v2M16 19v.01M10 21v.01M14 21v.01"/>
      </svg>
    );
  }
  if (code !== undefined && ((code >= 61 && code <= 67) || (code >= 80 && code <= 82))) {
    return (
      <svg {...svgProps}>
        <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/>
        <path d="M8 19v2M12 19v3M16 19v2"/>
      </svg>
    );
  }
  if (code !== undefined && ((code >= 71 && code <= 77) || code === 85 || code === 86)) {
    return (
      <svg {...svgProps}>
        <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/>
        <path d="M8 19h.01M12 19h.01M16 19h.01M8 22h.01M12 22h.01M16 22h.01"/>
      </svg>
    );
  }
  if (code !== undefined && code >= 95) {
    return (
      <svg {...svgProps}>
        <path d="M19 16.9A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/>
        <path d="M13 11l-4 6h6l-4 6"/>
      </svg>
    );
  }
  return (
    <svg {...svgProps}>
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/>
    </svg>
  );
}

export async function LondonWeather() {
  const weather = await getLondonWeather();

  if (!weather) return null;

  return (
    <div className="inline-flex items-center gap-2.5 mb-5 pl-3 pr-4 py-[9px] rounded-full bg-cream border border-smoke select-none">
      <span className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.12em] uppercase text-muted shrink-0">
        <span className="w-[6px] h-[6px] rounded-full bg-apex status-dot" />
        Live
      </span>
      <span className="w-px h-3.5 bg-smoke shrink-0" />
      <span className="text-[#5a5650] shrink-0">
        <WeatherIcon code={weather.weatherCode} />
      </span>
      <span className="font-bold text-black text-[14px] tracking-[-0.02em] shrink-0">{weather.temperature}°C</span>
      <span className="w-px h-3.5 bg-smoke shrink-0" />
      <span className="text-[12px] text-muted">London · {weather.description}</span>
    </div>
  );
}
