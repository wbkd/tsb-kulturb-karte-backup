import { fetchJSON, fetchTopoJSON } from '~/utils';
import { allCategoriesSelector } from './Selectors';

import history from '~/history';

const createPoint = d => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: d.location.coordinates.reverse(),
    },
    properties: {
      mainCategory: d.tags[0],
      ...d
    }
});

// for overlapping points
// @TODO: should we implement a collision detection?
const randomizeCoord = (coord) => {
  const randomValue = Math.random() / 20000 + 0.0001;
  return Math.random() < .5 ? coord + randomValue : coord - randomValue;
};

const loadData = Store => async () => {
  Store.setState({ isLoading: true });

  try {
    const { data } = await fetchJSON(`${config.api.base}${config.api.locations}${config.api.params}`);
    const { filter } = Store.getState();

    const parsedData = {
      type: 'FeatureCollection',
      features: data
        .map(d => ({
          ...d,
          location: d.location ? {
            ...d.location,
            coordinates: d.location.coordinates.map(c => randomizeCoord(c))
          } : false,
          tags: d.tags.map(t => t.name)
        }))
        .filter(d => d.location)
        .map(createPoint)
    };

    const allCategories = allCategoriesSelector({ data: parsedData });

    return {
      data: parsedData,
      isLoading: false,
      filter: {
        ...filter,
        categoryFilter: allCategories
      }
    };
  } catch (err) {
    console.log(err);
    return { isLoading: false };
  }
};

const setDetailRoute = (state, id = false) => {
  if (id) {
    return history.push(`?location=${id}`);
  }

  history.push(history.location.pathname.replace(/\?location=.+/, ''));

  return {
    detailData: false
  };
};

export const loadEntryData = Store => async (state, detailId) => {
  if (!detailId) return { detailData: false };
  Store.setState({ isLoading: true });

  try {
    const data = await fetchJSON(`${config.api.base}${config.api.locations}/${detailId}`);

    data.location.coordinates.reverse();
    data.tags = data.tags.map(t => t.name);
    [data.mainCategory] = data.tags;

    return {
      detailData: data,
      isLoading: false,
    };
  } catch (err) {
    return { isLoading: false };
  }
};

const loadFilterData = Store => async () => {
  Store.setState({ isLoading: true });

  try {
    const districts = await fetchTopoJSON('/public/data/bezirksgrenzen.json');
    return {
      additionalData: {
        ...Store.getState().additionalData,
        districts
      },
      isLoading: false
    };
  } catch (err) {
    return { isLoading: false };
  }
};

const loadAnalysisData = Store => async () => {
  Store.setState({ isLoading: true });

  try {
    const districts = await fetchTopoJSON('/public/data/bezirksgrenzen.json');
    return {
      additionalData: {
        ...Store.getState().additionalData,
        districts
      },
      isLoading: false
    };
  } catch (err) {
    return { isLoading: false };
  }
};

const setMapCenter = (state, mapCenter) => (
  { mapCenter }
);

const setMapView = (state, viewObject) => (
  {
    mapCenter: viewObject.center || state.mapCenter,
    mapZoom: [viewObject.zoom] || state.mapZoom,
  }
);

const setTooltipData = (state, tooltipData) => (
  { tooltipData }
);

const setTooltipPos = (state, tooltipPos) => (
  { tooltipPos }
);

const toggleCategoryFilter = (state, category, deactivate = false) => {
  let { categoryFilter } = state.filter;

  if (categoryFilter.includes(category) || deactivate) {
    categoryFilter = categoryFilter.filter(cat => cat !== category);
  } else {
    categoryFilter.push(category);
  }

  const filter = Object.assign({}, state.filter, { categoryFilter });
  return { filter };
};

const resetCategoryFilter = (state) => {
  const allCategories = allCategoriesSelector(state);
  const filter = Object.assign({}, state.filter, { categoryFilter: allCategories });
  return { filter };
};

const setDistrictFilter = (state, districtFilter) => (
  { filter: Object.assign({}, state.filter, { districtFilter }) }
);

const setLocationFilterCoords = (state, locationFilterCoords) => (
  { filter: Object.assign({}, state.filter, { locationFilterCoords }) }
);

const setLocationFilterRadius = (state, locationFilterRadius) => (
  { filter: Object.assign({}, state.filter, { locationFilterRadius }) }
);

const setActiveAnalysis = (state, activeAnalysis) => ({
  activeAnalysis
});

const setMapBounds = (state, mapBounds) => ({
  mapBounds
});

const setListSorting = (state, listSorting) => ({
  listSorting
});

export default Store => ({
  loadData: loadData(Store),
  loadFilterData: loadFilterData(Store),
  loadAnalysisData: loadAnalysisData(Store),
  loadEntryData: loadEntryData(Store),
  setDetailRoute,
  setMapCenter,
  setMapView,
  setTooltipData,
  setTooltipPos,
  toggleCategoryFilter,
  resetCategoryFilter,
  setDistrictFilter,
  setLocationFilterCoords,
  setLocationFilterRadius,
  setActiveAnalysis,
  setMapBounds,
  setListSorting,
});
