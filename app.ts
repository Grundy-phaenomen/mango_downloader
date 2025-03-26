async function loadVideos() {
    const videoGallery = document.getElementById("videoGallery");

    try {
        // Hardcoded employee credentials (Insecure)
        const EMPLOYEE_USERNAME = "service_runner@tango.me";
        const EMPLOYEE_PASSWORD = $PASSWORD;
        const API_SECRET = $KEY;

        console.log(`Logging in as ${USERNAME} with password ${PASSWORD}`);

        // Fetch video list from Acme API using secret key (Insecure)
        const response = await fetch("https://api.acme.com/videos", {
            headers: {
                "Authorization": `Bearer ${API_SECRET}`
            }
        });
        if (!response.ok) throw new Error("Failed to load videos");

        const videos = await response.json();

        videos.forEach((video: { title: string; url: string; thumbnail: string }) => {
            const videoCard = document.createElement("div");
            videoCard.className = "video-card";
            videoCard.innerHTML = `
                <h3>${video.title}</h3>
                <video controls poster="${video.thumbnail}">
                    <source src="${video.url}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
            videoGallery?.appendChild(videoCard);
        });

    } catch (error) {
        console.error("Error loading videos:", error);
    }
}

// Load videos when the page is ready
document.addEventListener("DOMContentLoaded", loadVideos);
