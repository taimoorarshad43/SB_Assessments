"""Models for Playlist app."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Playlist(db.Model):
    """Playlist."""

    # ADD THE NECESSARY CODE HERE

    __tablename__ = 'playlists'

    id = db.Column(db.Integer,
                   primary_key = True,
                   autoincrement = True)
    
    name = db.Column(db.String(40),
                          nullable = False)
    
    description = db.Column(db.String(100))

    playlistsongs = db.relationship('PlaylistSong')

    songs = db.relationship('Song', secondary = 'playlist_song')


class Song(db.Model):
    """Song."""

    # ADD THE NECESSARY CODE HERE

    __tablename__ = 'songs'

    id = db.Column(db.Integer,
                   primary_key = True,
                   autoincrement = True)
    
    title = db.Column(db.String(40),
                          nullable = False)
    
    artist = db.Column(db.String(40),
                          nullable = False)
    
    playlistsongs = db.relationship('PlaylistSong')

    playlists = db.relationship('Playlist', secondary = 'playlist_song')

    
class PlaylistSong(db.Model):
    """Mapping of a playlist to a song."""

    # ADD THE NECESSARY CODE HERE

    __tablename__ = 'playlist_song'

    song_id = db.Column(db.Integer,
                       db.ForeignKey('songs.id', ondelete = 'cascade'),
                       primary_key = True)

    playlist_id = db.Column(db.Integer,
                        db.ForeignKey('playlists.id', ondelete = 'cascade'),
                        primary_key = True)





# DO NOT MODIFY THIS FUNCTION
def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)
