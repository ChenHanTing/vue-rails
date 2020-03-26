# frozen_string_literal: true

class Todolist < ApplicationRecord
  belongs_to :user, optional: true
end
