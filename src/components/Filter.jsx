import * as React from "react";
import { useMst } from "hooks/useMst";
import { observer } from "mobx-react-lite";
import {
  Box,
  Container,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { SOURCES, LOCATIONS } from "mst/constants";

function Filter() {
  const { rentalStore } = useMst();
  const {
    selectedPriceRange,
    setSelectedPriceRange,
    selectedSources,
    setSelectedSources,
  } = rentalStore;

  const handlePriceChange = (type) => (event) => {
    const value = event.target.value === "" ? 0 : Number(event.target.value);
    if (type === "min") {
      setSelectedPriceRange(value, selectedPriceRange.max);
    } else {
      setSelectedPriceRange(selectedPriceRange.min, value);
    }
  };

  const handleSourceChange = (event) => {
    const value = event.target.value;
    setSelectedSources(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        left: "calc((100% - 80%) / 2 - 200px)",
        top: 70,
        minWidth: "240px",
        height: "fit-content",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mt: 4, minWidth: "250px", maxWidth: "250px" }}>
          <Paper sx={{ p: 2 }}>
            <Stack direction="column" spacing={2}>
              <TextField
                label="Min Price"
                type="number"
                value={selectedPriceRange.min}
                onChange={handlePriceChange("min")}
                fullWidth
              />
              <TextField
                label="Max Price"
                type="number"
                value={selectedPriceRange.max}
                onChange={handlePriceChange("max")}
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel>Source</InputLabel>
                <Select
                  multiple
                  value={selectedSources}
                  onChange={handleSourceChange}
                  renderValue={(selected) => selected.join(", ")}
                  label="Source"
                >
                  <MenuItem value={SOURCES.VANPEOPLE}>
                    <Checkbox
                      checked={selectedSources.includes(SOURCES.VANPEOPLE)}
                    />
                    <ListItemText primary="Vanpeople" />
                  </MenuItem>
                  <MenuItem value={SOURCES.CRAIGSLIST}>
                    <Checkbox
                      checked={selectedSources.includes(SOURCES.CRAIGSLIST)}
                    />
                    <ListItemText primary="Craigslist" />
                  </MenuItem>
                  <MenuItem value={SOURCES.KIJIJI}>
                    <Checkbox
                      checked={selectedSources.includes(SOURCES.KIJIJI)}
                    />
                    <ListItemText primary="Kijiji" />
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Location</InputLabel>
                <Select
                  multiple
                  value={rentalStore.selectedLocations}
                  onChange={(e) =>
                    rentalStore.setSelectedLocations(e.target.value)
                  }
                  renderValue={(selected) => selected.join(", ")}
                  label="Location"
                >
                  {Object.values(LOCATIONS).map((location) => (
                    <MenuItem key={location} value={location}>
                      <Checkbox
                        checked={rentalStore.selectedLocations.includes(
                          location
                        )}
                      />
                      <ListItemText primary={location} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

export default observer(Filter);
