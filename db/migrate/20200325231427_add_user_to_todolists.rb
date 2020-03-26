# frozen_string_literal: true

class AddUserToTodolists < ActiveRecord::Migration[6.0]
  def change
    add_reference :todolists, :user, foreign_key: true
  end
end
