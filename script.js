const slider = document.getElementById("year-slider");
const yearValue = document.getElementById("year-value");
const yearDock = document.getElementById("year-dock");
const tooltip = document.getElementById("tooltip");
const mapElement = document.getElementById("world-map");

const minYear = 24;
const maxYear = 2024;

const civilColor = "#f77f00";
const conflictPalette = [
  "#d62828",
  "#003049",
  "#6a4c93",
  "#2a9d8f",
  "#6d597a",
  "#bc6c25",
  "#386641",
  "#d00000"
];

const conflicts = [
  {
    id: "rompar",
    name: "Roman–Parthian Wars",
    link: "https://en.wikipedia.org/wiki/Roman%E2%80%93Parthian_wars",
    type: "interstate",
    participants: ["Italy", "Iran", "Iraq", "Turkey", "Syria"],
    start: 54,
    end: 217,
    activeYears: [54, 58, 62, 113, 115, 116, 161, 162, 197, 198, 214, 215, 216, 217]
  },
  {
    id: "anshan",
    name: "An Lushan Rebellion",
    link: "https://en.wikipedia.org/wiki/An_Lushan_Rebellion",
    type: "civil",
    participants: ["China"],
    start: 755,
    end: 763,
    activeYears: [755, 756, 757, 758, 759, 760, 761, 762, 763]
  },
  {
    id: "hundred",
    name: "Hundred Years' War",
    link: "https://en.wikipedia.org/wiki/Hundred_Years%27_War",
    type: "interstate",
    participants: ["France", "United Kingdom"],
    start: 1337,
    end: 1453,
    activeYears: [1337, 1346, 1356, 1360, 1415, 1429, 1450, 1453]
  },
  {
    id: "thirty",
    name: "Thirty Years' War",
    link: "https://en.wikipedia.org/wiki/Thirty_Years%27_War",
    type: "interstate",
    participants: ["Germany", "Czechia", "Austria", "France", "Sweden", "Spain"],
    start: 1618,
    end: 1648,
    activeYears: [1618, 1620, 1622, 1626, 1631, 1632, 1634, 1635, 1643, 1648]
  },
  {
    id: "taiping",
    name: "Taiping Rebellion",
    link: "https://en.wikipedia.org/wiki/Taiping_Rebellion",
    type: "civil",
    participants: ["China"],
    start: 1850,
    end: 1864,
    activeYears: [1850, 1853, 1856, 1858, 1860, 1862, 1864]
  },
  {
    id: "us-civil",
    name: "American Civil War",
    link: "https://en.wikipedia.org/wiki/American_Civil_War",
    type: "civil",
    participants: ["United States of America"],
    start: 1861,
    end: 1865,
    activeYears: [1861, 1862, 1863, 1864, 1865]
  },
  {
    id: "ww1",
    name: "World War I",
    link: "https://en.wikipedia.org/wiki/World_War_I",
    type: "interstate",
    participants: [
      "France",
      "Germany",
      "United Kingdom",
      "Russia",
      "Italy",
      "Austria",
      "Belgium",
      "Serbia",
      "Turkey",
      "Poland"
    ],
    start: 1914,
    end: 1918,
    activeYears: [1914, 1915, 1916, 1917, 1918]
  },
  {
    id: "ww2",
    name: "World War II",
    link: "https://en.wikipedia.org/wiki/World_War_II",
    type: "interstate",
    participants: [
      "France",
      "Germany",
      "United Kingdom",
      "Poland",
      "Russia",
      "China",
      "Japan",
      "United States of America",
      "Italy",
      "Australia",
      "Canada"
    ],
    start: 1939,
    end: 1945,
    activeYears: [1939, 1940, 1941, 1942, 1943, 1944, 1945]
  },
  {
    id: "korea",
    name: "Korean War",
    link: "https://en.wikipedia.org/wiki/Korean_War",
    type: "interstate",
    participants: ["North Korea", "South Korea", "United States of America", "China"],
    start: 1950,
    end: 1953,
    activeYears: [1950, 1951, 1952, 1953]
  },
  {
    id: "vietnam",
    name: "Vietnam War",
    link: "https://en.wikipedia.org/wiki/Vietnam_War",
    type: "interstate",
    participants: ["Vietnam", "United States of America", "Cambodia", "Laos"],
    start: 1955,
    end: 1975,
    activeYears: [1965, 1966, 1968, 1969, 1972, 1973, 1974, 1975]
  },
  {
    id: "soviet-afghan",
    name: "Soviet–Afghan War",
    link: "https://en.wikipedia.org/wiki/Soviet%E2%80%93Afghan_War",
    type: "interstate",
    participants: ["Afghanistan", "Russia"],
    start: 1979,
    end: 1989,
    activeYears: [1979, 1980, 1984, 1986, 1988, 1989]
  },
  {
    id: "rwanda",
    name: "Rwandan Civil War",
    link: "https://en.wikipedia.org/wiki/Rwandan_Civil_War",
    type: "civil",
    participants: ["Rwanda"],
    start: 1990,
    end: 1994,
    activeYears: [1990, 1991, 1992, 1993, 1994]
  },
  {
    id: "yugoslav",
    name: "Yugoslav Wars",
    link: "https://en.wikipedia.org/wiki/Yugoslav_Wars",
    type: "interstate",
    participants: [
      "Croatia",
      "Bosnia and Herzegovina",
      "Serbia",
      "Montenegro",
      "Slovenia",
      "North Macedonia",
      "Kosovo"
    ],
    start: 1991,
    end: 2001,
    activeYears: [1991, 1992, 1993, 1994, 1995, 1998, 1999, 2001]
  },
  {
    id: "syria",
    name: "Syrian Civil War",
    link: "https://en.wikipedia.org/wiki/Syrian_civil_war",
    type: "civil",
    participants: ["Syria"],
    start: 2011,
    end: 2024,
    activeYears: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]
  },
  {
    id: "ukraine",
    name: "Russo-Ukrainian War",
    link: "https://en.wikipedia.org/wiki/Russo-Ukrainian_War",
    type: "interstate",
    participants: ["Ukraine", "Russia"],
    start: 2014,
    end: 2024,
    activeYears: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]
  }
];

conflicts.forEach((conflict, index) => {
  if (conflict.type === "interstate") {
    conflict.color = conflictPalette[index % conflictPalette.length];
  }
});

const width = 1200;
const height = 600;
const svg = d3
  .select(mapElement)
  .attr("viewBox", `0 0 ${width} ${height}`)
  .attr("preserveAspectRatio", "xMidYMid meet");

const projection = d3.geoNaturalEarth1().scale(210).translate([width / 2, height / 2]);
const path = d3.geoPath(projection);

const g = svg.append("g");
const countryLayer = g.append("g");
const labelLayer = g.append("g");

const zoom = d3
  .zoom()
  .scaleExtent([1, 6])
  .on("zoom", (event) => {
    g.attr("transform", event.transform);
    updateLabels(event.transform.k);
  });

svg.call(zoom);

const activeConflictsByCountry = new Map();
let countryFeatures = [];

function updateDock(year) {
  yearDock.innerHTML = "";
  const spanRange = 4;
  for (let i = year - spanRange; i <= year + spanRange; i += 1) {
    if (i < minYear || i > maxYear) {
      continue;
    }
    const span = document.createElement("span");
    span.className = "year-tick";
    span.textContent = i;
    const distance = Math.abs(i - year);
    const scale = Math.max(0.7, 1.4 - distance * 0.15);
    span.style.transform = `scale(${scale})`;
    if (i === year) {
      span.classList.add("active");
    }
    yearDock.appendChild(span);
  }
}

function buildConflictIndex(year) {
  activeConflictsByCountry.clear();
  const countryStyles = new Map();

  conflicts.forEach((conflict) => {
    if (year < conflict.start || year > conflict.end) {
      return;
    }
    const isActive = conflict.activeYears.includes(year);
    const opacity = isActive ? 1 : 0.35;
    const color = conflict.type === "civil" ? civilColor : conflict.color;

    conflict.participants.forEach((country) => {
      const existing = countryStyles.get(country);
      if (!existing || opacity > existing.opacity) {
        countryStyles.set(country, { color, opacity });
      }

      if (!activeConflictsByCountry.has(country)) {
        activeConflictsByCountry.set(country, []);
      }
      activeConflictsByCountry.get(country).push({ conflict, isActive });
    });
  });

  return countryStyles;
}

function updateMap(year) {
  const styles = buildConflictIndex(year);

  countryLayer
    .selectAll("path")
    .attr("class", (d) => {
      const name = d.properties.name;
      return styles.has(name) ? "country conflict" : "country";
    })
    .style("fill", (d) => styles.get(d.properties.name)?.color || "#fff")
    .style("fill-opacity", (d) => styles.get(d.properties.name)?.opacity || 1);
    .attr("fill", (d) => styles.get(d.properties.name)?.color || "#fff")
    .attr("fill-opacity", (d) => styles.get(d.properties.name)?.opacity || 1);
}

function updateLabels(scale) {
  labelLayer
    .selectAll("text")
    .attr("opacity", (d) => {
      const minScale = d.properties.area > 0.02 ? 1.1 : 2.2;
      return scale >= minScale ? 1 : 0;
    });
}

function showTooltip(event, d) {
  const name = d.properties.name;
  const conflictsForCountry = activeConflictsByCountry.get(name) || [];

  const content = [
    `<h3>${name}</h3>`,
    conflictsForCountry.length
      ? `<ul>${conflictsForCountry
          .map(
            ({ conflict, isActive }) =>
              `<li>${
                isActive ? "●" : "○"
              } <a href="${conflict.link}" target="_blank" rel="noopener">${conflict.name}</a></li>`
          )
          .join("")}</ul>`
      : "<p>No recorded conflict for this year.</p>"
  ].join("");

  tooltip.innerHTML = content;
  tooltip.classList.add("visible");

  const { left, top } = mapElement.getBoundingClientRect();
  tooltip.style.left = `${event.clientX - left}px`;
  tooltip.style.top = `${event.clientY - top}px`;
}

function hideTooltip() {
  tooltip.classList.remove("visible");
}

function handleYearInput() {
  const year = Number(slider.value);
  yearValue.textContent = year;
  updateDock(year);
  updateMap(year);
}

function prepMap(world) {
  const countries = topojson.feature(world, world.objects.countries).features;
  countryFeatures = countries;

  countries.forEach((feature) => {
    feature.properties.area = d3.geoArea(feature);
  });

  countryLayer
    .selectAll("path")
    .data(countries)
    .join("path")
    .attr("class", "country")
    .attr("d", path)
    .on("mousemove", showTooltip)
    .on("mouseleave", hideTooltip);

  labelLayer
    .selectAll("text")
    .data(countries)
    .join("text")
    .attr("class", "country-label")
    .attr("transform", (d) => `translate(${path.centroid(d)})`)
    .text((d) => d.properties.name || "");

  updateLabels(1);
  handleYearInput();
}

fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
  .then((response) => response.json())
  .then(prepMap)
  .catch(() => {
    mapElement.insertAdjacentHTML(
      "afterend",
      "<p>Unable to load map data. Please check your connection.</p>"
    );
  });

slider.addEventListener("input", handleYearInput);
window.addEventListener("resize", () => updateLabels(d3.zoomTransform(svg.node()).k));
