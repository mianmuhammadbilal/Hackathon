
    import { db, collection, addDoc, getDocs } from "../firebase.js";

    const nameInput = document.getElementById("name");
    const descInput = document.getElementById("desc");
    const industrySelect = document.getElementById("industry");
    const infoBox = document.getElementById("info");
    const output = document.getElementById("output");
    const notifyBox = document.getElementById("notify");

    // ✅ Notify Function
    function notify(message, type = "success") {
      notifyBox.textContent = message;
      notifyBox.className = `notify ${type} show`;
      setTimeout(() => (notifyBox.className = "notify"), 3000);
    }

    // ✅ Industry Info
    const industryData = {
      tech: "💻 Tech: Software, AI, and digital innovation driving the world forward.",
      education: "🎓 Education: Smart learning, mentorship, and accessible knowledge.",
      health: "🏥 Health: AI diagnostics, telemedicine, and personalized wellness.",
      finance: "💰 Finance: Fintech, investments, and digital banking transformation.",
      ecommerce: "🛒 E-commerce: Digital marketplaces and next-gen retail experiences.",
      entertainment: "🎬 Entertainment: Creative media, gaming, and immersive content."
    };

    industrySelect.addEventListener("change", e => {
      const val = e.target.value;
      infoBox.style.display = val ? "block" : "none";
      infoBox.textContent = industryData[val] || "";
    });

    // ✅ Typing Animation
    function typeText(el, text, speed = 15) {
      el.innerHTML = "";
      let i = 0;
      const typing = setInterval(() => {
        el.innerHTML += text[i];
        i++;
        if (i >= text.length) clearInterval(typing);
      }, speed);
    }

    // ✅ AI Pitch Generator
    function generatePitch(name, desc, industry) {
      const taglines = {
        tech: "Empowering the digital future.",
        education: "Smarter learning for smarter lives.",
        health: "Wellness powered by innovation.",
        finance: "Simplifying the world of money.",
        ecommerce: "Reimagining how the world shops.",
        entertainment: "Where creativity meets experience."
      };
      const tagline = taglines[industry] || "Innovating for a better world.";

      const p1 = `${name} is a forward-thinking startup in the ${industry} industry that ${desc}. By combining innovation with real-world usability, ${name} delivers solutions that connect people and technology seamlessly.`;
      const p2 = `Our mission is to shape the future of ${industry} through creativity, data, and human-centered design. ${name} strives to make every interaction smarter, simpler, and more meaningful.`;

      return { tagline, pitch: `${p1}\n\n${p2}` };
    }

    // ✅ Generate Button
    document.getElementById("generate").addEventListener("click", async () => {
      const name = nameInput.value.trim();
      const desc = descInput.value.trim();
      const ind = industrySelect.value;
      if (!name || !desc || !ind) return notify("Please fill all fields!", "error");

      const data = generatePitch(name, desc, ind);
      const finalPitch = `🎯 ${data.tagline}\n\n${data.pitch}`;
      output.innerHTML = '<p class="typing"></p>';
      typeText(output.querySelector(".typing"), finalPitch, 15);

      try {
        await addDoc(collection(db, "pitches"), {
          name, desc, industry: ind, ...data, time: new Date().toISOString()
        });
        notify("Pitch Generated successfully ✅", "success");
      } catch {
        notify("Error saving pitch ❌", "error");
      }
    });

    // ✅ Show All Button
    document.getElementById("showAll").addEventListener("click", async () => {
      output.innerHTML = "<p>Loading...</p>";
      const snap = await getDocs(collection(db, "pitches"));
      if (snap.empty) return (output.innerHTML = "<p>No saved pitches yet.</p>");
      output.innerHTML = "";
      snap.forEach(d => {
        const x = d.data();
        output.innerHTML += `<div style="margin-bottom:15px;">
          <strong>${x.name}</strong> (${x.industry})<br>
          <em>${x.tagline}</em><br>
          <p>${x.pitch.replace(/\n/g, "<br>")}</p>
          <hr>
        </div>`;
      });
      notify("All saved pitches loaded 📜");
    });
  