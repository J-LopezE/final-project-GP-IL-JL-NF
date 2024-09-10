"""empty message

Revision ID: bf0b72b3a93f
Revises: 
Create Date: 2024-09-10 16:49:41.315227

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bf0b72b3a93f'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('bar',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('address', sa.String(length=120), nullable=True),
    sa.Column('history', sa.Text(), nullable=True),
    sa.Column('facebook_url', sa.String(length=120), nullable=True),
    sa.Column('instagram_url', sa.String(length=120), nullable=True),
    sa.Column('x_url', sa.String(length=120), nullable=True),
    sa.Column('picture_of_bar_url', sa.String(length=250), nullable=False),
    sa.Column('logo_of_bar_url', sa.String(length=250), nullable=False),
    sa.Column('latitude', sa.Float(), nullable=True),
    sa.Column('longitude', sa.Float(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('event_bar',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('bar_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('description', sa.String(length=120), nullable=False),
    sa.Column('date', sa.String(length=120), nullable=False),
    sa.Column('picture_of_event_url', sa.String(length=250), nullable=True),
    sa.ForeignKeyConstraint(['bar_id'], ['bar.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('beer', schema=None) as batch_op:
        batch_op.add_column(sa.Column('bar_id', sa.Integer(), nullable=True))
        batch_op.alter_column('brewery_id',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.create_foreign_key(None, 'bar', ['bar_id'], ['id'])

    with op.batch_alter_table('user', schema=None) as batch_op:
        #ADD THIS TWO LINES
        batch_op.add_column(sa.Column('rol', sa.String(length=120), nullable=False, server_default='Consumidor'))
        batch_op.drop_column('is_brewer')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_brewer', sa.BOOLEAN(), autoincrement=False, nullable=False))
        batch_op.drop_column('rol')

    with op.batch_alter_table('beer', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.alter_column('brewery_id',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.drop_column('bar_id')

    op.drop_table('event_bar')
    op.drop_table('bar')
    # ### end Alembic commands ###
