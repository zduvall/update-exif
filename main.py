import piexif
import typer
from pathlib import Path
from datetime import datetime

app = typer.Typer(
    help="A CLI tool to read and update EXIF metadata of a photo.",
    add_completion=False,
)

def validate_date(date_str: str) -> str:
    """Callback to validate the date format."""
    try:
        datetime.strptime(date_str, "%Y:%m:%d %H:%M:%S")
        return date_str
    except ValueError:
        raise typer.BadParameter("Date must be in 'YYYY:MM:DD HH:MM:SS' format.")

@app.command()
def read(
    file_path: Path = typer.Argument(
        ...,
        exists=True,
        file_okay=True,
        dir_okay=False,
        readable=True,
        help="Path to the photo file to read.",
    )
):
    """
    Reads and displays the EXIF data of a photo.
    """
    try:
        exif_dict = piexif.load(str(file_path))
        if not any(exif_dict.values()):
            typer.secho(f"No EXIF data found in '{file_path.name}'.", fg=typer.colors.YELLOW)
            return

        typer.secho(f"EXIF data for '{file_path.name}':", fg=typer.colors.CYAN)
        for ifd, data in exif_dict.items():
            if not data or ifd == "thumbnail":
                continue
            
            typer.secho(f"  {ifd}:", bold=True)
            for tag, value in data.items():
                tag_name = piexif.TAGS.get(ifd, {}).get(tag, {}).get("name", f"Unknown Tag {tag}")
                if isinstance(tag_name, bytes):
                    tag_name = tag_name.decode(errors="ignore")

                display_value = ""
                if isinstance(value, bytes):
                    try:
                        # Clean null bytes and decode
                        display_value = value.strip(b'\x00').decode(errors='replace')
                    except Exception:
                        display_value = repr(value)
                else:
                    display_value = value
                
                typer.secho(f"    - {tag_name} ({tag}): {display_value}")

        if exif_dict.get("thumbnail"):
            typer.secho("  thumbnail: (binary data not displayed)", bold=True)

    except Exception as e:
        typer.secho(
            f"An unexpected error occurred while reading '{file_path.name}': {e}",
            fg=typer.colors.RED,
            err=True
        )
        raise typer.Exit(code=1)

@app.command()
def update(
    file_path: Path = typer.Argument(
        ...,
        exists=True,
        file_okay=True,
        dir_okay=False,
        writable=True,
        readable=True,
        help="Path to the photo file to update.",
    ),
    new_date: str = typer.Argument(
        ...,
        callback=validate_date,
        help="The new date and time in 'YYYY:MM:DD HH:MM:SS' format.",
    ),
):
    """
    Updates the EXIF 'Date and Time' tags of a photo to a new value.
    """
    if file_path.suffix.lower() not in ('.jpg', '.jpeg'):
        typer.secho(
            f"Warning: '{file_path.name}' is not a JPEG file. "
            "This tool is optimized for JPEGs and may not work as expected.",
            fg=typer.colors.YELLOW
        )

    try:
        exif_dict = piexif.load(str(file_path))
        new_date_bytes = new_date.encode('utf-8')

        # Update all relevant date fields
        exif_dict['0th'][piexif.ImageIFD.DateTime] = new_date_bytes
        exif_dict['Exif'][piexif.ExifIFD.DateTimeOriginal] = new_date_bytes
        exif_dict['Exif'][piexif.ExifIFD.DateTimeDigitized] = new_date_bytes

        exif_bytes = piexif.dump(exif_dict)
        piexif.insert(exif_bytes, str(file_path))

        typer.secho(
            f"Successfully updated EXIF date for '{file_path.name}' to '{new_date}'.",
            fg=typer.colors.GREEN
        )
    except Exception as e:
        typer.secho(
            f"An unexpected error occurred while updating '{file_path.name}': {e}",
            fg=typer.colors.RED,
            err=True
        )
        raise typer.Exit(code=1)

if __name__ == "__main__":
    app()