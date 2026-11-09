"""Generate the one-page academic CV served by GitHub Pages."""

from pathlib import Path

import reportlab
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import HRFlowable, Paragraph, SimpleDocTemplate

ROOT = Path(__file__).resolve().parents[1]
SITE = "https://taha-y-merghani.github.io"
EMAIL = "tahaymerghani@gmail.com"
INK = HexColor("#202a28")
ACCENT = HexColor("#315f4e")
RULE = HexColor("#c6d0c5")

# Embed the fonts shipped with ReportLab so viewers render the same glyphs.
fonts = Path(reportlab.__file__).with_name("fonts")
for font_name, filename in (
    ("Vera", "Vera.ttf"), ("Vera Bold", "VeraBd.ttf"),
    ("Vera Italic", "VeraIt.ttf"), ("Vera Bold Italic", "VeraBI.ttf"),
):
    pdfmetrics.registerFont(TTFont(font_name, str(fonts / filename)))
pdfmetrics.registerFontFamily(
    "Vera", normal="Vera", bold="Vera Bold",
    italic="Vera Italic", boldItalic="Vera Bold Italic",
)

body = ParagraphStyle(
    "Body", fontName="Vera", fontSize=10.2, leading=14.3,
    textColor=INK, alignment=TA_LEFT, spaceAfter=6,
)
name_style = ParagraphStyle(
    "Name", parent=body, fontName="Vera", fontSize=33, leading=36, spaceAfter=5,
)
section_style = ParagraphStyle(
    "Section", parent=body, fontName="Vera Bold", textColor=ACCENT,
    fontSize=10, leading=13, spaceBefore=11, spaceAfter=4, keepWithNext=True,
)
contact_style = ParagraphStyle(
    "Contact", parent=body, fontSize=9.5, textColor=ACCENT, spaceAfter=12,
)


def link(url, label):
    return f'<link href="{url}" color="#315f4e"><u>{label}</u></link>'


def section(title, *entries):
    return [
        Paragraph(title.upper(), section_style),
        HRFlowable(width="100%", thickness=0.5, color=RULE, spaceAfter=6),
        *(Paragraph(entry, body) for entry in entries),
    ]


def main():
    doc = SimpleDocTemplate(
        str(ROOT / "Taha_Merghani_CV.pdf"), pagesize=letter,
        leftMargin=48, rightMargin=48, topMargin=34, bottomMargin=34,
        title="Taha Merghani | Academic CV", author="Taha Merghani",
        invariant=1,
    )
    story = [
        Paragraph("Taha Merghani", name_style),
        Paragraph(
            f'{link(f"mailto:{EMAIL}", EMAIL)} &nbsp; | &nbsp; '
            f'{link(SITE, "taha-y-merghani.github.io")} &nbsp; | &nbsp; '
            f'{link("https://github.com/taha-y-merghani", "GitHub")}',
            contact_style,
        ),
        *section(
            "Research interests",
            "Algorithmic fairness, human judgment in AI-assisted decisions, and language variation.",
        ),
        *section(
            "Education",
            "<b>M.S. in Computer Science</b>, Georgia Institute of Technology, 2019. GPA 3.87/4.00.",
            "<b>B.S. in Computer Engineering</b>, Jackson State University, 2017. GPA 4.00/4.00.",
        ),
        *section(
            "Workshop papers and research poster",
            "Balusu, Murali Raghu Babu, <b>Taha Merghani</b>, and Jacob Eisenstein. "
            "“Stylistic Variation in Social Media Part-of-Speech Tagging.” "
            "<i>Second Workshop on Stylistic Variation at NAACL</i>, 2018. "
            + link("https://aclanthology.org/W18-1602/", "Paper"),
            "<b>Merghani, Taha.</b> “Application of Hilbert-Schmidt Independence Criterion to "
            "Lexical Geographical Variation in Lyon, France.” "
            "<i>Black in AI Workshop at NeurIPS</i>, 2018. "
            + link(f"{SITE}/lyon-geolinguistic-variation-2018.pdf", "Manuscript"),
            "<b>Merghani, Taha</b>, Tuka Al Hanai, and James Glass. “Lexical Modeling of Egyptian "
            "Arabic for Automatic Speech Recognition.” MIT CSAIL research poster, 2015. "
            + link(f"{SITE}/mit-arabic-asr-2015.pdf", "Poster"),
        ),
        *section(
            "Research experience",
            "<b>Graduate Research Assistant, Georgia Tech</b> | 2017-2019<br/>"
            "Studied language variation across social networks and geography with Jacob Eisenstein. "
            "Worked on collaborative story generation with Mark Riedl.",
            "<b>Research Intern, MIT CSAIL</b> | Summer 2015<br/>"
            "Compared pronunciation dictionaries and acoustic models on Egyptian Arabic broadcast "
            "speech with Tuka Al Hanai and James Glass.",
        ),
        *section(
            "Selected engineering experience",
            "<b>Solutions Architect, Mesa Associates</b> | 2022-2023<br/>"
            "Built computer vision workflows for utility inspection using drone imagery.",
            "<b>AI Software Engineer, Decooda</b> | 2019-2020<br/>"
            "Built data pipelines and implemented machine learning workflows for customer analytics.",
            "<b>Software Engineering Intern, Apple Siri</b> | Summer 2016<br/>"
            "Built debugging tools for multilingual language understanding used by 120+ engineers.",
        ),
        *section(
            "Honors",
            "Jacksonian Award of Distinction, Jackson State University (2017). "
            "Apple HBCU Scholar and Distinguished Intern presenter (2016).",
        ),
    ]
    doc.build(story)


if __name__ == "__main__":
    main()
