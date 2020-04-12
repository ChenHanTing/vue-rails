# frozen_string_literal: true

Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  devise_for :users
  resources :posts
  resources :todolists

  root to: 'pages#home'
  get 'about', to: 'pages#about', as: 'about'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
