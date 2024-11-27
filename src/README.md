# import { createRoot } from 'react-dom/client'; ---  createRoot is for typescript , but for javascript, it is not required 
# const root = createRoot(container!); ---  ! is called Non-null assertion operator , it means it required that root id should be present
# Remove strict mode to stop double render