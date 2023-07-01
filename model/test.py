import requests
from bs4 import BeautifulSoup

# URL of the website you want to scrape
url = "https://cp-algorithms.com"

# Send a GET request to the website and retrieve the HTML content
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
    # Create a BeautifulSoup object to parse the HTML content
    soup = BeautifulSoup(response.content, "html.parser")

    # Find and extract the desired content from different tags
    # headings = soup.find_all(["h1", "h2"])  # Extract content from <h1> and <h2> tags
    # for heading in headings:
    #     print(heading.get_text())

    links = soup.find_all("a")  # Extract content from <a> tags
    for link in links:
        print(link.get_text())

else:
    print("Failed to retrieve the website content.")
