<div class="modal fade" id="createModal" tabindex="-1" role="dialog" aria-labelledby="pb-create_header" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="pb-create_header">Create New Entry</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div id="pbc-errors" class="alert alert-danger d-none" role="alert"><ul></ul></div>
        <form action="{{ action('PersonController@store') }}" method="post">
          @csrf
          <div class="form-group">
            <label for="pbc-first_name">First Name</label>
            <input type="text" name="first_name" class="form-control" id="pbc-first_name">
          </div>
          <div class="form-group">
            <label for="pbc-last_name">Last Name</label>
            <input type="text" name="last_name" class="form-control" id="pbc-last_name">
          </div>
          <div class="form-group">
            <label for="pbc-title">Title</label>
            <input type="text" name="title" class="form-control" id="pbc-title">
          </div>
          <div class="form-group">
            <label for="pbc-phone">Phone Number</label>
            <input type="text" name="phone" class="form-control" id="pbc-phone">
          </div>
          <button type="button" name="image" class="btn btn-warning">img upload</button>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary" id="haha">Add Person</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
