# frozen_string_literal: true

class TodolistsController < ApplicationController
  before_action :set_todolist, only: %i[show edit update destroy]
  before_action :authenticate_user!

  def index
    @todolists = if params[:account]
                   user = User.find_by(email: params[:account])
                   Todolist.where(user: user)
                 else
                   Todolist.all
                 end
  end

  def create
    todo_flow = Todolist.transaction do
      (1..params[:number]).each do |_|
        @todolist = Todolist.new(todolist_params)
        @todolist.user = current_user
        @todolist.save!
      end
    end

    respond_result(todo_flow, '新增成功')
  end

  def update
    respond_result(@todolist.update(todolist_params), '更新成功')
  end

  def destroy
    respond_result(@todolist.destroy, '刪除成功')
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_todolist
    @todolist = Todolist.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def todolist_params
    params.require(:todolist).permit(:item, :number)
  end

  def respond_result(cond, msg)
    respond_to do |format|
      format.html
      format.json do
        if cond
          render json: {
            message: msg,
            success: true
          }
        else
          render json: {
            message: @todolist.errors.full_messages.join(', '),
            success: false
          }
        end
      end
    end
  end
end
