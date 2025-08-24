import piexif
import typer
from datetime import datetime
from pathlib import Path
from typing import Optional
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError

app = typer.Typer(
    help="A CLI tool to read and update EXIF metadata of a photo.",
    add_completion=False,
)

def validate_date(date_str: str) -> str:
    """Callback to validate and normalize the date format."""
    try:
        # First, try the full datetime format
        datetime.strptime(date_str, "%Y:%m:%d %H:%M:%S")
        return date_str
    except ValueError:
        # If that fails, try the date-only format
        try:
            datetime.strptime(date_str, "%Y:%m:%d")
            # If successful, append the default time
            return f"{date_str} 12:00:00"
        except ValueError:
            # If both fail, raise an error
            raise typer.BadParameter(
                "Date must be in 'YYYY:MM:DD HH:MM:SS' or 'YYYY:MM:DD' format."
            )

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
        help="The new date, optionally with time. Use 'YYYY:MM:DD' or 'YYYY:MM:DD HH:MM:SS'. Time defaults to 12:00:00 if omitted.",
    ),
    tz: Optional[str] = typer.Option(
        None,
        "--timezone",
        "-tz",
        help="Timezone of the new date (e.g., 'America/New_York', 'UTC', 'Europe/London').",
        show_default=False,
    ),
):
    """
    Updates the EXIF 'Date and Time' tags of a photo to a new value.
    Optionally, sets timezone-aware offset tags.
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

        # Update the primary, local-time date fields
        exif_dict['0th'][piexif.ImageIFD.DateTime] = new_date_bytes
        exif_dict['Exif'][piexif.ExifIFD.DateTimeOriginal] = new_date_bytes
        exif_dict['Exif'][piexif.ExifIFD.DateTimeDigitized] = new_date_bytes

        # Handle timezone if provided
        if tz:
            try:
                # Create a timezone-aware datetime object to calculate the UTC offset
                tz_info = ZoneInfo(tz)
                naive_dt = datetime.strptime(new_date, "%Y:%m:%d %H:%M:%S")
                aware_dt = naive_dt.replace(tzinfo=tz_info)
                
                # Format the offset as a string (e.g., '-04:00', '+05:30')
                offset = aware_dt.utcoffset()
                offset_seconds = offset.total_seconds()
                sign = '+' if offset_seconds >= 0 else '-'
                hours = abs(int(offset_seconds // 3600))
                minutes = abs(int((offset_seconds % 3600) // 60))
                offset_str = f"{sign}{hours:02}:{minutes:02}"
                
                # Set the EXIF offset tags
                offset_bytes = offset_str.encode('utf-8')
                exif_dict['Exif'][piexif.ExifIFD.OffsetTimeOriginal] = offset_bytes
                exif_dict['Exif'][piexif.ExifIFD.OffsetTimeDigitized] = offset_bytes
                exif_dict['Exif'][piexif.ExifIFD.OffsetTime] = offset_bytes

                success_message = (
                    f"Successfully updated EXIF date for '{file_path.name}' to '{new_date}' ({offset_str})."
                )

            except ZoneInfoNotFoundError:
                typer.secho(f"Error: Invalid timezone '{tz}'.", fg=typer.colors.RED, err=True)
                raise typer.Exit(code=1)
        else:
            success_message = (
                f"Successfully updated EXIF date for '{file_path.name}' to '{new_date}'."
            )

        exif_bytes = piexif.dump(exif_dict)
        piexif.insert(exif_bytes, str(file_path))

        typer.secho(success_message, fg=typer.colors.GREEN)

    except Exception as e:
        typer.secho(
            f"An unexpected error occurred while updating '{file_path.name}': {e}",
            fg=typer.colors.RED,
            err=True
        )
        raise typer.Exit(code=1)


if __name__ == "__main__":  # pragma: no cover
    app()