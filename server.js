import "dotenv/config";       
import app from "./app.js";  

// ℹ️ Sets the PORT for our app. Defaults to 5005 if not in .env
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
