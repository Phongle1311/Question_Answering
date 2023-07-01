import requests
from bs4 import BeautifulSoup


def extractContentFromURL(url):
    # Send a GET request to the website and retrieve the HTML content
    response = requests.get(url)
    content = ""

    # Check if the request was successful
    if response.status_code == 200:
        # Create a BeautifulSoup object to parse the HTML content
        soup = BeautifulSoup(response.content, "html.parser")

        elements = soup.find_all(["p", "span", "a", "h2"])
        for element in elements:
            text = element.get_text().strip()
            text = " ".join(text.split())
            content += text + ". "

        return content

    else:
        return "Failed to retrieve the website content."
