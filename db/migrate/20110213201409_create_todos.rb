class CreateTodos < ActiveRecord::Migration
  def self.up
    create_table :todos do |t|
      t.string :title
      t.text :description
      t.datetime :deadline_at
      t.timestamps
    end
  end

  def self.down
    drop_table :todos
  end
end
