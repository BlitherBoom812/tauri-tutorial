"""Start server"""
import os
import uvicorn

if __name__ == "__main__":
    uvicorn.run(app="backend.application.app:app",
                host="localhost",
                port=12345,
                reload=True,
                reload_excludes=os.path.join("ConvRPA", "data"),
                workers=1)