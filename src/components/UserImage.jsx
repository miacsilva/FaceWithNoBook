import PropTypes from "prop-types"; //From MUI's library. For Prop validation
import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  const defaultImage = "default-picture.jpg";
  return (

    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`http://localhost:3001/assets/${image}`|| defaultImage} // Use user's image if available, otherwise use default
      />
    </Box>
  );
};


UserImage.propTypes = {
  image: PropTypes.string.isRequired, // 'image' prop is required
  size: PropTypes.string // 'size' prop is optional 
};

export default UserImage;
