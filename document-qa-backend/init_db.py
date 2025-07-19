# from models.models import Base, engine

# if __name__ == "__main__":
#     Base.metadata.create_all(bind=engine)
#     print("✅ Tables created successfully.")
from models import Base, engine
Base.metadata.create_all(bind=engine)
print("✅ Tables created.")
