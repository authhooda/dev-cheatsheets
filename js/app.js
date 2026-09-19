/* =========================================================
   DEV CHEATSHEETS
   Shared JavaScript
========================================================= */


/* =========================================================
   DARK MODE
========================================================= */

const themeToggle =
    document.getElementById("themeToggle");

const savedTheme =
    localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
}


function updateThemeButton() {

    if (!themeToggle) {
        return;
    }

    const isDark =
        document.body.classList.contains("dark");

    themeToggle.textContent =
        isDark ? "☀️" : "🌙";

    themeToggle.setAttribute(
        "aria-label",
        isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
    );
}


updateThemeButton();


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        function () {

            document.body.classList.toggle("dark");

            const isDark =
                document.body.classList.contains("dark");

            localStorage.setItem(
                "theme",
                isDark
                    ? "dark"
                    : "light"
            );

            updateThemeButton();
        }
    );
}


/* =========================================================
   CHEATSHEET SEARCH
========================================================= */

const searchInput =
    document.getElementById(
        "cheatsheetSearch"
    );


if (searchInput) {

    const cards =
        document.querySelectorAll(
            ".cheatsheet-card"
        );

    const categories =
        document.querySelectorAll(
            ".category"
        );

    const noResults =
        document.getElementById(
            "noResults"
        );


    if (noResults) {
        noResults.style.display = "none";
    }


    searchInput.addEventListener(
        "input",
        function () {

            const searchTerm =
                searchInput.value
                    .toLowerCase()
                    .trim();


            let hasResults = false;


            /* -----------------------------------------
               FILTER CHEATSHEET CARDS
            ----------------------------------------- */

            cards.forEach(
                function (card) {

                    const searchableText =
                        (
                            card.dataset.name ||
                            card.textContent
                        ).toLowerCase();


                    if (
                        searchableText.includes(
                            searchTerm
                        )
                    ) {

                        card.style.display = "";

                        hasResults = true;

                    } else {

                        card.style.display = "none";
                    }
                }
            );


            /* -----------------------------------------
               HIDE EMPTY CATEGORIES
            ----------------------------------------- */

            categories.forEach(
                function (category) {

                    const categoryCards =
                        category.querySelectorAll(
                            ".cheatsheet-card"
                        );


                    let hasVisibleCard = false;


                    categoryCards.forEach(
                        function (card) {

                            if (
                                card.style.display !==
                                "none"
                            ) {

                                hasVisibleCard = true;
                            }
                        }
                    );


                    category.style.display =
                        hasVisibleCard ||
                        searchTerm === ""
                            ? ""
                            : "none";
                }
            );


            /* -----------------------------------------
               NO RESULTS MESSAGE
            ----------------------------------------- */

            if (noResults) {

                noResults.style.display =
                    hasResults ||
                    searchTerm === ""
                        ? "none"
                        : "block";
            }

        }
    );


    /* -----------------------------------------
       "/" KEY → FOCUS SEARCH
    ----------------------------------------- */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "/" &&
                document.activeElement !== searchInput
            ) {

                event.preventDefault();

                searchInput.focus();
            }
        }
    );


    /* -----------------------------------------
       ESCAPE KEY → CLEAR SEARCH
    ----------------------------------------- */

    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                searchInput.value = "";

                searchInput.dispatchEvent(
                    new Event("input")
                );

                searchInput.blur();
            }
        }
    );
}


/* =========================================================
   CURRENT YEAR
========================================================= */

const currentYear =
    document.getElementById(
        "currentYear"
    );


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();
}

/* =========================================================
   COPY CODE BUTTONS
========================================================= */

const codeBlocks =
    document.querySelectorAll(
        "pre"
    );


codeBlocks.forEach(
    function (block) {

        const code =
            block.querySelector("code");

        if (!code) {
            return;
        }


        const copyButton =
            document.createElement("button");

        copyButton.className =
            "copy-button";

        copyButton.type =
            "button";

        copyButton.textContent =
            "Copy";


        block.appendChild(
            copyButton
        );


        copyButton.addEventListener(
            "click",
            async function () {

                try {

                    await navigator.clipboard.writeText(
                        code.innerText
                    );

                    copyButton.textContent =
                        "Copied!";

                    setTimeout(
                        function () {
                            copyButton.textContent =
                                "Copy";
                        },
                        1500
                    );

                } catch (error) {

                    copyButton.textContent =
                        "Failed";

                    setTimeout(
                        function () {
                            copyButton.textContent =
                                "Copy";
                        },
                        1500
                    );
                }
            }
        );
    }
);