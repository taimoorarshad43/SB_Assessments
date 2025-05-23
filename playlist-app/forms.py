"""Forms for playlist app."""

from wtforms import SelectField, StringField, TextAreaField
from wtforms.validators import DataRequired, Length

from flask_wtf import FlaskForm


class PlaylistForm(FlaskForm):
    """Form for adding playlists."""

    # Add the necessary code to use this form

    name = StringField('Playlist Name', validators=[DataRequired(''), Length(max=100)])
    description = TextAreaField('Description', validators=[DataRequired(''), Length(max=500)])


class SongForm(FlaskForm):
    """Form for adding songs."""

    # Add the necessary code to use this form

    song = StringField('Song Name', validators=[DataRequired(''), Length(max=100)])
    artist = StringField('Artist', validators=[DataRequired(''), Length(max=100)])


# DO NOT MODIFY THIS FORM - EVERYTHING YOU NEED IS HERE
class NewSongForPlaylistForm(FlaskForm):
    """Form for adding a song to playlist."""

    song = SelectField('Song To Add', coerce=int)
