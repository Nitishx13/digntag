from pathlib import Path

FOOTER_INSERT = """                <div>
                    <h5 class="text-lg font-bold mb-4">Partnerships</h5>
                    <ul class="space-y-2 text-sm">
                        <li><a href="./designers.html" class="hover:text-cta transition duration-150">Designers</a></li>
                        <li><a href="./business-bulk-orders.html" class="hover:text-cta transition duration-150">Business &amp; Bulk Orders</a></li>
                        <li><a href="./sustainability.html" class="hover:text-cta transition duration-150">Sustainability</a></li>
                        <li><a href="./wholesale.html" class="hover:text-cta transition duration-150">Wholesale</a></li>
                    </ul>
                </div>

                <!-- Social Icons Placeholder -->"""

def main():
    root = Path("c:/Users/Admin/OneDrive/Documents/GitHub/digntag")
    html_files = [p for p in root.glob("*.html") if p.name != "update_footer.py"]
    needle = """                <div>
                    <h5 class="text-lg font-bold mb-4">Support</h5>
                    <ul class="space-y-2 text-sm">
                        <li><a href="./support.html" class="hover:text-cta transition duration-150">Support</a></li>
                        <li><a href="./faq.html" class="hover:text-cta transition duration-150">FAQ</a></li>
                        <li><a href="./contact.html" class="hover:text-cta transition duration-150">Contact Us</a></li>
                        <li><a href="./shipping.html" class="hover:text-cta transition duration-150">Shipping</a></li>
                        <li><a href="./terms.html" class="hover:text-cta transition duration-150">Terms</a></li>
                    </ul>
                </div>

                <!-- Social Icons Placeholder -->"""
    for path in html_files:
        text = path.read_text(encoding="utf-8")
        if "Partnerships" in text:
            continue
        if needle in text:
            text = text.replace(needle, needle.replace("\n\n                <!-- Social Icons Placeholder -->", "") + "\n\n" + FOOTER_INSERT)
            path.write_text(text, encoding="utf-8")


if __name__ == "__main__":
    main()
