import * as React from "react";
import { useMst } from "hooks/useMst";
import { observer } from "mobx-react-lite";
import {
  Box,
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  CardActionArea,
} from "@mui/material";

const labelStyle = {
  // fontWeight: "bold",
  backgroundColor: "backdrop.main",
  color: "customYellow.main",
  px: 1,
  py: 0.3,
  borderRadius: 1,
};

function MainContent() {
  const { rentalStore } = useMst();
  const { filteredRentalListings } = rentalStore;
  const [displayCount, setDisplayCount] = React.useState(12);
  const loadMoreRef = React.useRef(null);

  const currentItems = filteredRentalListings.slice(0, displayCount);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          displayCount < filteredRentalListings.length
        ) {
          setDisplayCount((prev) => prev + 12);
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [displayCount, filteredRentalListings.length]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
          {currentItems.map((listing) => (
            <Grid item xs={12} sm={6} md={3} key={listing.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardActionArea
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                  }}
                  onClick={() => window.open(listing.url, "_blank")}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={listing.imageUrl || "/imagePlaceholder.jpg"}
                    alt={listing.title}
                    sx={{
                      objectFit: "cover",
                    }}
                  />
                  <CardContent
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      padding: 2,
                      "&:last-child": { paddingBottom: 2 },
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        height: "48px",
                        lineHeight: "1.2",
                        mb: 1,
                      }}
                    >
                      {listing.title}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {listing.location}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          backgroundColor: "backdrop.main",
                          color: "grey.100",
                          px: 1,
                          py: 0.3,
                          borderRadius: 1,
                        }}
                      >
                        {listing.source}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        mt: "auto",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="h6"
                        color="primary"
                        sx={{ fontWeight: "bold" }}
                      >
                        {listing.price ? `$${listing.price}` : "N/A"}
                      </Typography>

                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        {listing.bedrooms && (
                          <Typography variant="caption" sx={labelStyle}>
                            {listing.bedrooms}BR
                          </Typography>
                        )}
                        {listing.bathrooms && (
                          <Typography variant="caption" sx={labelStyle}>
                            {listing.bathrooms}BA
                          </Typography>
                        )}
                        {listing.type && (
                          <Typography variant="caption" sx={labelStyle}>
                            {listing.type}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        {displayCount < filteredRentalListings.length && (
          <Box
            ref={loadMoreRef}
            sx={{
              width: "100%",
              height: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 4,
            }}
          >
            <Typography color="text.secondary">Loading more...</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default observer(MainContent);
